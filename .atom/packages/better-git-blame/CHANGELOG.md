## 0.5.0 Remove support for integrations and clarify we're no longer supporting the plugin
* We've removed the support for code hosting and project management integrations because we are no longer supporting this extension. Thank you for using our product, check out what [we're up to now](https://www.stepsize.com/?utm_source=product_linking&utm_medium=product_linking&utm_campaign=product_linking-bgb-2020-01-09&utm_content=bgb_link)!

## 0.4.8 Update readme to more permanently phase out the GitLab integration
* In response to #39 we updated the readme to more closely reflect the state of the GitLab integration (TLDR: not for now).

## 0.4.7 Fix gutter styling incompatability when using light themes
* Fixed issue #37 - The theming colors now provide contrast for legibility (tooltip improvement included) (thanks @topherfangio for spotting this!)

## 0.4.6 Improve gutter copy for uncommitted code
* The copy for uncommitted code is now clearer (thanks @Jackymancs4 for your PR #34!)

## 0.4.5 Reflect that the GitLab integration is temporarily unavailable
* We've released a breaking change to our API meaning it's not currently possible to setup a new GitLab integration. Apologies.

## 0.4.4 Fix issue computing code folds
* Fixed issue #30 - the code fold logic could crash for certain files

## 0.4.3 Add success notification on copy commit hash
* Improved the UX when copying a commit hash to clipboard by displaying a short-lived success notification

## 0.4.2 Git URL Parsing fix & copy commit hash
* Fixed a bug with the parsing of remote Git URLs (#29)
* Updated the `onClick` handler of the commit hash in the tooltip to copy the hash to the clipboard instead of opening the commit in the browser (#28)

## 0.4.1 API Fixes
* Fixed a bug that would cause POST requests to the API to fail

## 0.4.0: GitLab support
* Added support for the GitLab integration!
* Set it up [here](https://stepsize.com/gitlab/setup) to view Merge Request and Issue info for your GitLab repos.
* Note: release includes breaking changes to our web API so you need to upgrade to 0.4.0 to keep using the GitHub & Jira integrations.

## 0.3.2: Fix Atom <=> Layer communication
* Check for presence of Layer on plugin boot to make it easy to get up and running with the app. This has no effect if you don't have Layer.

## 0.3.1: Toggle age section
* The age section of the blame popover can now be hidden

## 0.3.0: Combined popover
* Combined the blame popover and the age tooltip into one

## 0.2.4: Analytics tweak
* Anonymously track repos for which the plugin is used to measure team usage (see #21).

## 0.2.3: Improve logging & request options
* Improved the logging to help debug issue #16
* Updated the user-agent in the request to the augmentation server

## 0.2.2: Win32 & Bug Fixes
* Fixed issue preventing the gutter from rendering on Windows platforms
* Fixed issue causing Bad Request errors in console when presenting the popover (#16)

## 0.2.1: Hotfixes
* Fixed a few issues with the tooltip analytics introduced in 0.2.0 resulting in duplicate records and the integration notification not being displayed.

## 0.2.0: Age Tooltip & Integration Notification
* Added new tooltip when hovering over the age gutter to visualise that time span.
* Added a notification to prompt users to install integrations to see additional relevant data.

## 0.1.6: Layer & Analytics
* Fixed issues with analytics not recording timestamps
* Fixed bugs that would cause Layer to perform multiple searches when using the Search in Layer functionality
* Trimmed new lines in git stdout to prevent user hashes being incorrectly calculated
* Added random user hashes for analytics where users have no global git config email set (#8)

## 0.1.1 - 0.1.5: Hotfixes
* Fixed a bug that would prevent the Layer desktop app performing a search when clicking the Search in Layer button after the Layer process has been terminated (#3)
* Updated package keywords
* Fix errors being thrown on launch when no git config is present (#5)

## 0.1.0: First Official Release
### New features <small>- Introducing the Better Git Blame gutter view!</small>
* Toggle gutter with `ctrl-b` to display `git blame` data
* Mouse over the gutter to show the blame popover
* Stepsize Services to fetch pull request & issue metadata have been integrated to display this data in the blame popover
* Gutter view is color-coded to represent the age of code relative to the whole repo
* Lines sharing the same commit & pull request are highlighted while the blame popover is in view
* Added “Search in Layer” functionality

### Technical Details
* Initial package boilerplate and TypeScript config
* Added selection event watching to support Layer desktop app
* Ported UDP message format from existing Layer atom plugin
* Added calculations for repo relative age color coding ([node-color-gradient](https://github.com/Stepsize/node-color-gradient))
* Added Preact for rendering gutter items and popover
* Added lowdb for in-memory caching of shared resources (Pull Requests, Issues)
* Added functions for handling `git` child processes
* Added logic for selecting relevant code blocks for gutter view regions
* Added anonymous user tracking
* Performance optimisations
