'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import runGitCommand from './runCommand';
import findRepoRoot from './findRepoRoot';
function getRepoRemotes(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const repoRoot = findRepoRoot(filePath);
        try {
            const remotes = yield runGitCommand(repoRoot, 'remote -v');
            if (remotes === '') {
                return [];
            }
            return remotes
                .trim()
                .split('\n')
                .map(remote => {
                const matchedRemote = remote.match(/(.+)\t(.+)\s\((.+)\)/);
                return {
                    name: matchedRemote[1],
                    url: matchedRemote[2],
                    type: matchedRemote[3],
                };
            });
        }
        catch (e) {
            throw e;
        }
    });
}
export default getRepoRemotes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9naXQvcmVtb3Rlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7Ozs7Ozs7OztBQUVaLE9BQU8sYUFBYSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyx3QkFBOEIsUUFBZ0I7O1FBQzVDLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDM0QsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDWixDQUFDO1lBQ0QsTUFBTSxDQUFDLE9BQU87aUJBQ1gsSUFBSSxFQUFFO2lCQUNOLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ1gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNaLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxDQUFDO29CQUNMLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUN0QixHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDckIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZCLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLENBQUM7UUFDVixDQUFDO0lBQ0gsQ0FBQztDQUFBO0FBRUQsZUFBZSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IHJ1bkdpdENvbW1hbmQgZnJvbSAnLi9ydW5Db21tYW5kJztcbmltcG9ydCBmaW5kUmVwb1Jvb3QgZnJvbSAnLi9maW5kUmVwb1Jvb3QnO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRSZXBvUmVtb3RlcyhmaWxlUGF0aDogc3RyaW5nKSB7XG4gIGNvbnN0IHJlcG9Sb290ID0gZmluZFJlcG9Sb290KGZpbGVQYXRoKTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZW1vdGVzID0gYXdhaXQgcnVuR2l0Q29tbWFuZChyZXBvUm9vdCwgJ3JlbW90ZSAtdicpO1xuICAgIGlmIChyZW1vdGVzID09PSAnJykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gcmVtb3Rlc1xuICAgICAgLnRyaW0oKVxuICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgLm1hcChyZW1vdGUgPT4ge1xuICAgICAgICBjb25zdCBtYXRjaGVkUmVtb3RlID0gcmVtb3RlLm1hdGNoKC8oLispXFx0KC4rKVxcc1xcKCguKylcXCkvKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBtYXRjaGVkUmVtb3RlWzFdLFxuICAgICAgICAgIHVybDogbWF0Y2hlZFJlbW90ZVsyXSxcbiAgICAgICAgICB0eXBlOiBtYXRjaGVkUmVtb3RlWzNdLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJlcG9SZW1vdGVzO1xuIl19