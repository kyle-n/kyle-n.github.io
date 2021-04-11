bundle exec jekyll build
cd _site
git restore .nojekyll
git add .
git commit -m "New version"
git push origin master
