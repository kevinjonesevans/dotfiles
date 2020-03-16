'use babel';
import { name } from '../package.json';
const packageName = name;
export const config = {
    defaultWidth: {
        title: 'Gutter width (px)',
        type: 'integer',
        default: 210,
        order: 1,
    },
    gutterDateFormat: {
        title: 'Gutter date format',
        description: 'Moment.js compatible [date format string](https://momentjs.com/docs/#/displaying/format/)',
        type: 'string',
        default: 'YYYY-MM-DD',
        order: 2,
    },
    colorScale: {
        title: 'Gutter color scale',
        description: 'Preset scales for coloring commits based on age (requires editor reload)',
        type: 'string',
        default: 'RoyalPomegranate',
        enum: [
            'RoyalPomegranate',
            'ChocolateMint',
            'VioletApple',
            'AffairGoblin',
            'GoldDaisy',
            'PoppyLochmara',
            'PersianSteel',
        ],
        order: 3,
    },
    displayAgeSection: {
        title: 'Display code age in popover',
        description: 'When viewing the blame popover, display the section visualising the age of the code',
        type: 'boolean',
        default: true,
        order: 4,
    },
    truncateGutterNames: {
        title: 'Truncate author names in gutter',
        description: 'Attempt to truncate commit author names to display first initial and surname only',
        type: 'boolean',
        default: true,
        order: 5,
    },
    highlightPullRequestOnHover: {
        title: 'Highlight pull request on hover',
        description: 'When viewing the blame popover, highlight lines introduced by commits from the same pull request',
        type: 'boolean',
        default: true,
        order: 6,
    },
    displayHighlightLabels: {
        title: 'Display highlight labels',
        description: 'When viewing the blame popover, show commit hashes and pull requests numbers in the top right of highlighted sections',
        type: 'boolean',
        default: true,
        order: 7,
    },
    sendUsageStatistics: {
        title: 'Send anonymous usage statistics',
        description: 'Send anonymous usage data to Stepsize so we can improve the plugin',
        type: 'boolean',
        default: true,
        order: 8,
    },
    parallelGitProcessing: {
        title: 'Use parallel processing for Git commands',
        description: 'Can improve performance on multi-core machines, if the gutter is slow try disabling this',
        type: 'boolean',
        default: true,
        order: 9,
    },
    searchInLayerEnabled: {
        title: 'Enable Search in Layer (macOS only)',
        description: 'Send code selection events via UDP to the Layer desktop app to use its search functionality',
        type: 'boolean',
        default: true,
        order: 10,
    },
};
export function getConfig() {
    return config;
}
export function get(key) {
    return atom.config.get(`${packageName}.${key}`);
}
export function set(key, value) {
    return atom.config.set(`${packageName}.${key}`, value);
}
export function observe(key, ...args) {
    return atom.config.observe(`${packageName}.${key}`, ...args);
}
export function onDidChange(key, ...args) {
    return atom.config.onDidChange(`${packageName}.${key}`, ...args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9Db25maWdNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQztBQUVaLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFFekIsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHO0lBQ3BCLFlBQVksRUFBRTtRQUNaLEtBQUssRUFBRSxtQkFBbUI7UUFDMUIsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsR0FBRztRQUNaLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixLQUFLLEVBQUUsb0JBQW9CO1FBQzNCLFdBQVcsRUFDVCwyRkFBMkY7UUFDN0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsWUFBWTtRQUNyQixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsS0FBSyxFQUFFLG9CQUFvQjtRQUMzQixXQUFXLEVBQUUsMEVBQTBFO1FBQ3ZGLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixJQUFJLEVBQUU7WUFDSixrQkFBa0I7WUFDbEIsZUFBZTtZQUNmLGFBQWE7WUFDYixjQUFjO1lBQ2QsV0FBVztZQUNYLGVBQWU7WUFDZixjQUFjO1NBQ2Y7UUFDRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsaUJBQWlCLEVBQUU7UUFDakIsS0FBSyxFQUFFLDZCQUE2QjtRQUNwQyxXQUFXLEVBQ1QscUZBQXFGO1FBQ3ZGLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsbUJBQW1CLEVBQUU7UUFDbkIsS0FBSyxFQUFFLGlDQUFpQztRQUN4QyxXQUFXLEVBQ1QsbUZBQW1GO1FBQ3JGLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsMkJBQTJCLEVBQUU7UUFDM0IsS0FBSyxFQUFFLGlDQUFpQztRQUN4QyxXQUFXLEVBQ1Qsa0dBQWtHO1FBQ3BHLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsS0FBSyxFQUFFLDBCQUEwQjtRQUNqQyxXQUFXLEVBQ1QsdUhBQXVIO1FBQ3pILElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsbUJBQW1CLEVBQUU7UUFDbkIsS0FBSyxFQUFFLGlDQUFpQztRQUN4QyxXQUFXLEVBQUUsb0VBQW9FO1FBQ2pGLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QscUJBQXFCLEVBQUU7UUFDckIsS0FBSyxFQUFFLDBDQUEwQztRQUNqRCxXQUFXLEVBQ1QsMEZBQTBGO1FBQzVGLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0Qsb0JBQW9CLEVBQUU7UUFDcEIsS0FBSyxFQUFFLHFDQUFxQztRQUM1QyxXQUFXLEVBQ1QsNkZBQTZGO1FBQy9GLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixLQUFLLEVBQUUsRUFBRTtLQUNWO0NBQ0YsQ0FBQztBQUVGLE1BQU07SUFDSixNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxNQUFNLGNBQWMsR0FBVztJQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRUQsTUFBTSxjQUFjLEdBQVcsRUFBRSxLQUFVO0lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsSUFBSSxHQUFHLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRUQsTUFBTSxrQkFBa0IsR0FBVyxFQUFFLEdBQUcsSUFBVztJQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxXQUFXLElBQUksR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRUQsTUFBTSxzQkFBc0IsR0FBVyxFQUFFLEdBQUcsSUFBVztJQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFXLElBQUksR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNuRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCB7IG5hbWUgfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuY29uc3QgcGFja2FnZU5hbWUgPSBuYW1lO1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBkZWZhdWx0V2lkdGg6IHtcbiAgICB0aXRsZTogJ0d1dHRlciB3aWR0aCAocHgpJyxcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMjEwLFxuICAgIG9yZGVyOiAxLFxuICB9LFxuICBndXR0ZXJEYXRlRm9ybWF0OiB7XG4gICAgdGl0bGU6ICdHdXR0ZXIgZGF0ZSBmb3JtYXQnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ01vbWVudC5qcyBjb21wYXRpYmxlIFtkYXRlIGZvcm1hdCBzdHJpbmddKGh0dHBzOi8vbW9tZW50anMuY29tL2RvY3MvIy9kaXNwbGF5aW5nL2Zvcm1hdC8pJyxcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnWVlZWS1NTS1ERCcsXG4gICAgb3JkZXI6IDIsXG4gIH0sXG4gIGNvbG9yU2NhbGU6IHtcbiAgICB0aXRsZTogJ0d1dHRlciBjb2xvciBzY2FsZScsXG4gICAgZGVzY3JpcHRpb246ICdQcmVzZXQgc2NhbGVzIGZvciBjb2xvcmluZyBjb21taXRzIGJhc2VkIG9uIGFnZSAocmVxdWlyZXMgZWRpdG9yIHJlbG9hZCknLFxuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6ICdSb3lhbFBvbWVncmFuYXRlJyxcbiAgICBlbnVtOiBbXG4gICAgICAnUm95YWxQb21lZ3JhbmF0ZScsXG4gICAgICAnQ2hvY29sYXRlTWludCcsXG4gICAgICAnVmlvbGV0QXBwbGUnLFxuICAgICAgJ0FmZmFpckdvYmxpbicsXG4gICAgICAnR29sZERhaXN5JyxcbiAgICAgICdQb3BweUxvY2htYXJhJyxcbiAgICAgICdQZXJzaWFuU3RlZWwnLFxuICAgIF0sXG4gICAgb3JkZXI6IDMsXG4gIH0sXG4gIGRpc3BsYXlBZ2VTZWN0aW9uOiB7XG4gICAgdGl0bGU6ICdEaXNwbGF5IGNvZGUgYWdlIGluIHBvcG92ZXInLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1doZW4gdmlld2luZyB0aGUgYmxhbWUgcG9wb3ZlciwgZGlzcGxheSB0aGUgc2VjdGlvbiB2aXN1YWxpc2luZyB0aGUgYWdlIG9mIHRoZSBjb2RlJyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBvcmRlcjogNCxcbiAgfSxcbiAgdHJ1bmNhdGVHdXR0ZXJOYW1lczoge1xuICAgIHRpdGxlOiAnVHJ1bmNhdGUgYXV0aG9yIG5hbWVzIGluIGd1dHRlcicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnQXR0ZW1wdCB0byB0cnVuY2F0ZSBjb21taXQgYXV0aG9yIG5hbWVzIHRvIGRpc3BsYXkgZmlyc3QgaW5pdGlhbCBhbmQgc3VybmFtZSBvbmx5JyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBvcmRlcjogNSxcbiAgfSxcbiAgaGlnaGxpZ2h0UHVsbFJlcXVlc3RPbkhvdmVyOiB7XG4gICAgdGl0bGU6ICdIaWdobGlnaHQgcHVsbCByZXF1ZXN0IG9uIGhvdmVyJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdXaGVuIHZpZXdpbmcgdGhlIGJsYW1lIHBvcG92ZXIsIGhpZ2hsaWdodCBsaW5lcyBpbnRyb2R1Y2VkIGJ5IGNvbW1pdHMgZnJvbSB0aGUgc2FtZSBwdWxsIHJlcXVlc3QnLFxuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiB0cnVlLFxuICAgIG9yZGVyOiA2LFxuICB9LFxuICBkaXNwbGF5SGlnaGxpZ2h0TGFiZWxzOiB7XG4gICAgdGl0bGU6ICdEaXNwbGF5IGhpZ2hsaWdodCBsYWJlbHMnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1doZW4gdmlld2luZyB0aGUgYmxhbWUgcG9wb3Zlciwgc2hvdyBjb21taXQgaGFzaGVzIGFuZCBwdWxsIHJlcXVlc3RzIG51bWJlcnMgaW4gdGhlIHRvcCByaWdodCBvZiBoaWdobGlnaHRlZCBzZWN0aW9ucycsXG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgb3JkZXI6IDcsXG4gIH0sXG4gIHNlbmRVc2FnZVN0YXRpc3RpY3M6IHtcbiAgICB0aXRsZTogJ1NlbmQgYW5vbnltb3VzIHVzYWdlIHN0YXRpc3RpY3MnLFxuICAgIGRlc2NyaXB0aW9uOiAnU2VuZCBhbm9ueW1vdXMgdXNhZ2UgZGF0YSB0byBTdGVwc2l6ZSBzbyB3ZSBjYW4gaW1wcm92ZSB0aGUgcGx1Z2luJyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBvcmRlcjogOCxcbiAgfSxcbiAgcGFyYWxsZWxHaXRQcm9jZXNzaW5nOiB7XG4gICAgdGl0bGU6ICdVc2UgcGFyYWxsZWwgcHJvY2Vzc2luZyBmb3IgR2l0IGNvbW1hbmRzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdDYW4gaW1wcm92ZSBwZXJmb3JtYW5jZSBvbiBtdWx0aS1jb3JlIG1hY2hpbmVzLCBpZiB0aGUgZ3V0dGVyIGlzIHNsb3cgdHJ5IGRpc2FibGluZyB0aGlzJyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBvcmRlcjogOSxcbiAgfSxcbiAgc2VhcmNoSW5MYXllckVuYWJsZWQ6IHtcbiAgICB0aXRsZTogJ0VuYWJsZSBTZWFyY2ggaW4gTGF5ZXIgKG1hY09TIG9ubHkpJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdTZW5kIGNvZGUgc2VsZWN0aW9uIGV2ZW50cyB2aWEgVURQIHRvIHRoZSBMYXllciBkZXNrdG9wIGFwcCB0byB1c2UgaXRzIHNlYXJjaCBmdW5jdGlvbmFsaXR5JyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBvcmRlcjogMTAsXG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZmlnKCkge1xuICByZXR1cm4gY29uZmlnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGtleTogc3RyaW5nKSB7XG4gIHJldHVybiBhdG9tLmNvbmZpZy5nZXQoYCR7cGFja2FnZU5hbWV9LiR7a2V5fWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gIHJldHVybiBhdG9tLmNvbmZpZy5zZXQoYCR7cGFja2FnZU5hbWV9LiR7a2V5fWAsIHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmUoa2V5OiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gIHJldHVybiBhdG9tLmNvbmZpZy5vYnNlcnZlKGAke3BhY2thZ2VOYW1lfS4ke2tleX1gLCAuLi5hcmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uRGlkQ2hhbmdlKGtleTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICByZXR1cm4gYXRvbS5jb25maWcub25EaWRDaGFuZ2UoYCR7cGFja2FnZU5hbWV9LiR7a2V5fWAsIC4uLmFyZ3MpO1xufVxuIl19