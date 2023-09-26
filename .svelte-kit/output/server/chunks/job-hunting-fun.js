import { c as create_ssr_component } from "./ssr.js";
const metadata = {
  "layout": "post",
  "title": "Things I was asked to do while job hunting",
  "date": "2021-04-10T00:00:00.000Z",
  "keywords": "jobs, career, personal",
  "hn": "https://news.ycombinator.com/item?id=26763336"
};
const Job_hunting_fun = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p data-svelte-h="svelte-135dmhu">I recently had to get a new job. My wife got a residency in another state, and my previous job is going back to in-person.</p>  <p data-svelte-h="svelte-7aqmiz">I have two years’ experience working for a startup on enterprise-scale software. My day job is on the frontend with some backend from open source work.</p> <p data-svelte-h="svelte-cqekum">Here are some things I was asked to do while job hunting:</p> <ul data-svelte-h="svelte-17xy20f"><li>Work as a contractor because the company forgot I said I’d be moving and didn’t want to file the paperwork in two states. That seemed reasonable, so I agreed. At the time, I did not know the school or state of my wife’s residency.[^1] The company waffled, then pulled the offer with no explanation. They did at least pay me for time spent on the technical screen.</li> <li>Fill out a recruiter’s profile of me for him (Word doc and internal assessment and all).</li> <li>Pass a cognitive test asking me to do basic arithmetic and convert fractions as fast as I could.</li> <li>Take a personality test where I had to select adjectives I felt applied to me.</li> <li>Enter my years of experience with “Problem Solving.” I am 28 years old, so I put 28.</li> <li>Listen to a recruiter tell me I could move to South Florida for a job after a year because “who knows if you and your girlfriend will still be together.” I had referred to her as my wife on the same call.</li></ul> <p data-svelte-h="svelte-1y90nxx">The cognitive test actually made me laugh. Imagine a workplace where someone yells, “Nazario! Get over here, we need someone add some fractions! No calculators!!!”</p> <p data-svelte-h="svelte-cmk077">Anyway, hiring is broken, we all know it. I accepted a position with a <a href="https://www.bitovi.com" rel="nofollow">company</a> that had a sane, speedy hiring process.</p> <p data-svelte-h="svelte-17hsqwr">[^1]: Veterinarians can do a residency if they want to specialize, like to be a neurologist or cardiologist. You get most residencies through “the match.” Prospective residents rank programs they’re most interested in, and the programs rank applicants. On a given date in the spring, you find out if or where you matched.<br><br>This is why for several weeks, I knew we would be in Tennessee, Florida, Indiana or California, but not the specific state.</p>`;
});
export {
  Job_hunting_fun as default,
  metadata
};
