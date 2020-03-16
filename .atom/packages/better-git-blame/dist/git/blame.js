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
import path from 'path';
function blame(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let repoRoot = findRepoRoot(filePath);
        if (!repoRoot) {
            throw new Error('File does not exist inside a git repo');
        }
        const relPath = path.relative(repoRoot, filePath);
        return runGitCommand(repoRoot, `blame --show-number --show-name -l --root ${relPath}`);
    });
}
export default blame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZ2l0L2JsYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7Ozs7O0FBRVosT0FBTyxhQUFhLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUV4QixlQUFxQixRQUFROztRQUMzQixJQUFJLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSw2Q0FBNkMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDO0NBQUE7QUFFRCxlQUFlLEtBQUssQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5pbXBvcnQgcnVuR2l0Q29tbWFuZCBmcm9tICcuL3J1bkNvbW1hbmQnO1xuaW1wb3J0IGZpbmRSZXBvUm9vdCBmcm9tICcuL2ZpbmRSZXBvUm9vdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuYXN5bmMgZnVuY3Rpb24gYmxhbWUoZmlsZVBhdGgpIHtcbiAgbGV0IHJlcG9Sb290ID0gZmluZFJlcG9Sb290KGZpbGVQYXRoKTtcbiAgaWYgKCFyZXBvUm9vdCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRmlsZSBkb2VzIG5vdCBleGlzdCBpbnNpZGUgYSBnaXQgcmVwbycpO1xuICB9XG4gIGNvbnN0IHJlbFBhdGggPSBwYXRoLnJlbGF0aXZlKHJlcG9Sb290LCBmaWxlUGF0aCk7XG4gIHJldHVybiBydW5HaXRDb21tYW5kKHJlcG9Sb290LCBgYmxhbWUgLS1zaG93LW51bWJlciAtLXNob3ctbmFtZSAtbCAtLXJvb3QgJHtyZWxQYXRofWApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBibGFtZTtcbiJdfQ==