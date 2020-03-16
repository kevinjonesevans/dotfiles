'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import findRepoRoot from './findRepoRoot';
import runGitCommand from './runCommand';
import os from 'os';
function getFirstCommitDate(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const repoRoot = findRepoRoot(filePath);
        let command = 'log --reverse --date-order --pretty=%ad | head -n 1';
        if (os.platform() === 'win32') {
            command = 'log --reverse --date-order --pretty=%ad | Select -First 1';
        }
        try {
            const firstCommit = yield runGitCommand(repoRoot, command, true);
            return new Date(firstCommit);
        }
        catch (e) {
            throw e;
        }
    });
}
export default getFirstCommitDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3RDb21taXREYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2dpdC9maXJzdENvbW1pdERhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDOzs7Ozs7Ozs7QUFFWixPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLGFBQWEsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXBCLDRCQUFrQyxRQUFROztRQUN4QyxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFeEMsSUFBSSxPQUFPLEdBQUcscURBQXFELENBQUM7UUFDcEUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDOUIsT0FBTyxHQUFHLDJEQUEyRCxDQUFDO1FBQ3hFLENBQUM7UUFDRCxJQUFJLENBQUM7WUFDSCxNQUFNLFdBQVcsR0FBRyxNQUFNLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxDQUFDO1FBQ1YsQ0FBQztJQUNILENBQUM7Q0FBQTtBQUVELGVBQWUsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IGZpbmRSZXBvUm9vdCBmcm9tICcuL2ZpbmRSZXBvUm9vdCc7XG5pbXBvcnQgcnVuR2l0Q29tbWFuZCBmcm9tICcuL3J1bkNvbW1hbmQnO1xuaW1wb3J0IG9zIGZyb20gJ29zJztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Rmlyc3RDb21taXREYXRlKGZpbGVQYXRoKSB7XG4gIGNvbnN0IHJlcG9Sb290ID0gZmluZFJlcG9Sb290KGZpbGVQYXRoKTtcblxuICBsZXQgY29tbWFuZCA9ICdsb2cgLS1yZXZlcnNlIC0tZGF0ZS1vcmRlciAtLXByZXR0eT0lYWQgfCBoZWFkIC1uIDEnO1xuICBpZiAob3MucGxhdGZvcm0oKSA9PT0gJ3dpbjMyJykge1xuICAgIGNvbW1hbmQgPSAnbG9nIC0tcmV2ZXJzZSAtLWRhdGUtb3JkZXIgLS1wcmV0dHk9JWFkIHwgU2VsZWN0IC1GaXJzdCAxJztcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IGZpcnN0Q29tbWl0ID0gYXdhaXQgcnVuR2l0Q29tbWFuZChyZXBvUm9vdCwgY29tbWFuZCwgdHJ1ZSk7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGZpcnN0Q29tbWl0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Rmlyc3RDb21taXREYXRlO1xuIl19