*AutoTOC* automatically creates a table of contents for all HTML-headers on a web page.

### Background
This script was originally written by *Rune Skaug* (see: [UserScripts-Mirror](http://userscripts-mirror.org/scripts/show/1301), [UserJS.org](http://userjs.org/scripts/browser/enhancements/auto-toc)).

I use this script for years, and though it was last updated in 2006, it still does a great job: it adds a TOC (table-of-contents) to each page, making long pages much easier to navigate. For the TOC not eating screen space unnecessarily, Rune had implemented a „toggle“ so you could switch it on and off. I decided it was much easier to generally hide the TOC to 95% – leaving just an indicator un-hiding it on mouse over; so I wrote a UserStyle for that purpose and uploaded it to UserStyles.Org ([Hide/unHide AutoTOC navigation bar](https://userstyles.org/styles/22265/hide-unhide-autotoc-navigation-bar)). With that site having become much too bloated, and Rune no longer working on the script (his last update was in 2006, as pointed out already), I've now integrated the CSS directly with the script for your convenience.

### History
* 1.0 - Basic version (2005-07-06)
* 1.1 - Adds Hide TOC button
* 1.2 - Only show visible headings (Firefox); Work around Firefox rendering bugs; Adds Menu item: AutoTOC: Toggle display (Firefox)
* 1.3 - Sets a session cookie for TOC hiding (per domain)
* 1.4 - Disables adding of menu item; Choose your own string pattern to match (RXmatch)
* 1.5 - Minor adjustments for GM 0.6/FF1.5; Moved closebutton to the left; Flash on select
* 1.6 - Xpath search replaces treewalker, FF1,1.5,Opera9
* 1.7 - Minor fixes, screen-only stylesheet
* 1.7.65 - last version by Rune Skaug (2006-12-25)
* 1.7.66 - integrated my previously separate UserStyle to hide the TOC unless hovered (Izzy; 2020-01-20)