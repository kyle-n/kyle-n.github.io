# ----------------------------------------------------- #
#                                                       #
# AJC CONTENT OF SCALE NOTIFICATION SYSTEM, V2          #
#                                                       #
# This is a Python script for notifying other newsrooms #
# about AJC Content of Scale stories. It pulls from a   #
# page I set up on ajc.com and sends an email and Slack #
# notification to five newsrooms.                       #
#                                                       #
# This is the second version of the script. It has been #
# rewritten and refactored to be a more elegant piece   #
# of code. The first one was a little kludgy.           #
#                                                       #
# As with the last script, some of the logic remains    #
# in my email rules and IFTTT.                          #
#                                                       #
# This is the basic Terminal-first version of the       #
# script. I plan on making it into a Slack bot. The     #
# improved structure and code should make that easier.  #
# At this point I'd really just have to swap out the    #
# code-focused main menu and some of the inputs.        #
#                                                       #
# (c) Kyle Nazario                                      #
# Jan. 22, 2018                                         #
# Last updated March 5, 2018                            #
# ----------------------------------------------------- #

from lxml import html
import requests
import sys
import random

# Global vars
containerUrl = 'https://www.ajc.com/news/cos-wire-content/qCEIYdj15z4weg20NeAWiJ/?' + str(random.randrange(0, 9999))
domains = ('https://www.ajc.com', 'https://www.accessatlanta.com', 'https://www.myajc.com', 'https://www.daytondailynews.com', 'https://www.mydaytondailynews.com', 'https://www.dayton.com', 'https://www.whio.com', 'https://www.journal-news.com', 'https://www.springfieldnewssun.com')
emailSig = '<br /><br />For questions about this story, please contact:<br /><br /><b>Kyle Nazario</b><br />Producer<br />C: 614-735-7364<br />Kyle.Nazario@ajc.com'
PORT = 8000

# Indicates loading
def ld():
    sys.stdout.write('.')
    sys.stdout.flush()

# For xpath traversal
def getSet(url, xlink):

    # Loading sign
    ld()

    # Grab page and return list data
    page = requests.get(url)
    tree = html.fromstring(page.content)
    stories = tree.xpath(xlink)
    return stories

# Find title and link of given story
def cosTitle(storyIndex_in):
    
    global containerUrl
    global emailSig

    # Tell user data is loading. Does not use ld() bc is initial
    sys.stdout.write('Loading')
    sys.stdout.flush()

    # Pass storyIndex the number of the story (1-5) from 5 most recent
    storyIndex = (int(storyIndex_in) - 1) * 2

    # Container object for all story data. Passed between methods
    data = {'org': '', 'title': '', 'message': '', 'plainLinks': '', 'htmlLinks': '', 'siteSource': '', 'link': ''}    

    # Grab title
    stories = getSet(containerUrl, '//a[@class="result-link"]/text()')
    if len(stories) > 0:
        data['title'] = stories[storyIndex].strip()

    # Grab story link, shared across domains
    links = getSet(containerUrl, '//a[@class="result-link"]/@href')
    if len(links) > 0:
        data['link'] = links[storyIndex_in - 1].strip() # Link set is different
        # Test if URL includes domain
        if data['link'].startswith('https://www.accessatlanta.com'):
            data['link'] = data['link'][29:]
        if data['link'].startswith('https://www.myajc.com'):
            data['link'] = data['link'][21:]

    return data

# Pings site for story at link
def siteCheck(domain, link):
    isLive = False
    r = requests.get(domain + link)
    if r.status_code == 200:
        isLive = True
    return isLive

# Check the Cox domains
def findSites(data_in):

    data = data_in
    global domains

    # Loading indicator
    ld()

    # Set up HTML links for email
    data['htmlLinks'] = data['title'] + '<br />'

    # Iterate over each website
    flag = False
    for domain in domains:
        isLive = siteCheck(domain, data['link'])
        site = domain + data['link']
        if isLive == True:
            data['plainLinks'] += site + '\n'
            data['htmlLinks'] += '<a href="' + site + '">' + site + '</a><br />' 
            if flag == False:
                data['siteSource'] = site
                flag = True

    # Remove last newline character
    data['plainLinks'] = data['plainLinks'][:-1]

    # Add email signature
    data['htmlLinks'] += emailSig

    return data

# Find article source
def getSource(data_in):

    data = data_in
    presets = {'The Washington Post': 'WaPo', 'Washington Post': 'WaPo', 'USA TODAY': 'USA Today', 'USA TODAY Sports': 'USA Today', 'The Atlanta Journal-Constitution': 'AJC', 'Time Inc.': 'Time', 'The New York Times': 'NYT', 'Austin-American Statesman': 'AAS', 'Palm Beach Post': 'PBP', 'Palm Beach Post Staff Writer': 'PBP'}

    # Loading indicator
    ld()

    # MyAJC sources display differently
    if 'myajc.com' in data['siteSource']:
        sourceList = getSet(data['siteSource'], '//*[@id="article-well"]/div[1]/p/text()')
        if len(sourceList) > 0:
            data['org'] = sourceList[0].strip()
            splitter = data['org'].index('-')
            data['org'] = data['org'][(splitter + 2):].strip()

    # AJC sources
    else:
        sourceList = getSet(data['siteSource'], '/html/body/div[8]/div[9]/article/header/div[2]/div/div/ul/div[1]/text() | /html/body/div[8]/div[9]/article/header/div[2]/div/div/ul/div[1]/text() | /html/body/div[8]/div[9]/article/header/div[2]/div/div[1]/ul/span/text() | /html/body/div[8]/div[9]/article/header/div[2]/div/div[1]/ul/span/text()')
        if len(sourceList) > 0:
            data['org'] = sourceList[0].strip()

    # For new site formatting
    if (len(data['org']) <= 0):
        org = getSet(data['siteSource'], '//span[@class="source"]/text()')
        if (len(org) > 0):
            data['org'] = org[0][2:]

    # Format for niceties
    for preset in presets:
        if data['org'] == preset:
            data['org'] = presets[preset]
            break

    return data

# Chooses from last five stories published
def pickStory():
    
    global containerUrl

    # Loading indicator
    sys.stdout.write('Loading..')
    sys.stdout.flush()
    
    # Import data from container page, article title
    stories = getSet(containerUrl, '//a[@class="result-link"]/text()')

    # Print story picker menu
    done = False

    # Print story picker menu
    done = False
    decision = -1
    if len(stories) > 0:
        while done == False:
            print '\nEnter story number below'
            i = 0

            # Write index, title of 5 most recent stories
            while i < 10:
                counter = str(int(i / 2 + 1))
                sys.stdout.write('(' + counter + ') ' + stories[i].strip() + '\n')
                i = i + 2
            print '(0) Exit'
            decision = raw_input('--> ')

            isInt = True
            try:
                decision = int(decision)
            except ValueError:
                print 'Not a valid integer'
                isInt = False

            # Grab correct story index
            if isInt == True:
                if decision == 0:
                    print ('Exiting')
                    sys.exit()
                if decision > 0 and decision <= 5:
                    done = True
                else:
                    print 'Number outside options'

    # Run methods on custom story
    data = cosTitle(decision)
    data = findSites(data)
    data = getSource(data)

    # Fix spacing for loading indicator
    sys.stdout.write('\n')
    sys.stdout.flush()

    return data

# Push data from custom URL, good for Methode weirdness
def customStory(customUrl_in):

    # Set up usual container URL, since we're not using cosTitle()
    data = {'org': '', 'title': '', 'message': '', 'plainLinks': '', 'htmlLinks': '', 'siteSource': '', 'link': ''}
    link = customUrl_in
    title = ''

    # Check if URL is valid
    if len(link) <= 0:
        print 'No URL entered'
        sys.exit()
    r = requests.get(link)
    if r.status_code == 404:
        print '404 error'
        sys.exit()

    # Grab title
    titles = getSet(link, '/html/body/div[8]/div[9]/article/header/h1/text() | //*[@id="article-well"]/header/h1/text()')
    i = 0
    if len(titles) > 0:
        title = titles[0].strip()

    # Strip link of domain
    if link.startswith("https://www.accessatlanta.com"):
        link = link[29:]
    if link.startswith('https://www.myajc.com'):
        link = link[21:]
    if link.startswith('https://www.ajc.com'):
        link = link[19:]

    # Assign data and perform methods
    data['title'] = title
    data['link'] = link
    data = findSites(data)
    data = getSource(data)

    # Fix spacing for loading indicator
    sys.stdout.write('\n')
    sys.stdout.flush()

    return data

# Main menu
def cosMenu():

    global containerUrl

    # Find titles and base link of most recent link
    data = cosTitle(1)
    data = findSites(data)
    data = getSource(data)

    # Package story data for IFTTT
    pkg = {}
    pkg['value1'] = data['org'] + ': ' + data['title']
    pkg['value2'] = data['plainLinks']
    pkg['value3'] = data['htmlLinks']

    # Menu system
    done = False
    output = '\n\n' + pkg['value1'] + '\n\n' + data['plainLinks']
    message = ''
    while done == False:

        # Print story data and options
        print output
        print '\nMenu:\n(1) Edit source | (2) Edit title | (3) Add message\n(4) Swap story  | (5) Test email | (6) Input link'
        print 'Push story? (y/n)'
        decision = str(raw_input('--> '))

        # Push story
        if decision == 'y':
            requests.post('https://maker.ifttt.com/trigger/newCoSMessage/with/key/KEY_REDACTED', data=pkg)
            requests.post('https://maker.ifttt.com/trigger/cosEmail/with/key/KEY_REDACTED', data=pkg)            
            print 'Story pushed'
            done = True

        # Exit program
        elif decision == 'n':
            print 'Exiting'
            done = True

        # Edit source
        elif decision == '1':
            data['org'] = str(raw_input('Enter new source below\n--> '))

        # Edit title
        elif decision == '2':
            data['title'] = str(raw_input('Enter new title below\n--> '))

        # Add message
        elif decision == '3':
            message = str(raw_input('Add message below\n--> '))
            # Remove previous message
            if data['htmlLinks'].count('<br /><br />') > 2:
                slicer = data['htmlLinks'].find('<br /><br />')
                data['htmlLinks'] = message + '<br /><br />' + data['htmlLinks'][(slicer + 12):]
            else:
                data['htmlLinks'] = message + '<br /><br />' + data['htmlLinks']

        # Changes story to push
        elif decision == '4':
            data = pickStory()

        # Send test email just to me
        elif decision == '5':
            requests.post('https://maker.ifttt.com/trigger/testCoS/with/key/KEY_REDACTED', data=pkg)
            print 'Test message sent'
            done = True

        # Custom link
        elif decision == '6':
            newLink = str(raw_input('Paste new link below\n--> '))
            sys.stdout.write('Loading')
            sys.stdout.flush()
            data = customStory(newLink)

        # Send to Revvie
        elif decision == '7':
            sendRevvie(data)
            print 'Sent to Revvie'
            done = True

        # Bad input
        else:
            print 'Input unreadable'

        # Rebuild IFTTT pkg after possible changes
        pkg['value1'] = data['org'] + ': ' + data['title']
        pkg['value2'] = data['plainLinks']
        pkg['value3'] = data['htmlLinks']
        
        # Rebuild output
        if len(message) > 0:
            output = '\n' + pkg['value1'] + '\n\n' + message + '\n\n' + data['plainLinks']        
        else:
            output = '\n' + pkg['value1'] + '\n\n' + data['plainLinks']

    return

# Main method that runs the scripting
cosMenu()
