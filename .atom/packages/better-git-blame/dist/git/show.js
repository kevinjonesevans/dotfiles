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
import os from 'os';
import _ from 'lodash';
import * as ConfigManager from '../ConfigManager';
const cpuCount = os.cpus().length;
function show(filePath, hashes) {
    return __awaiter(this, void 0, void 0, function* () {
        const useParallel = ConfigManager.get('parallelGitProcessing');
        let processCount = 1;
        if (useParallel) {
            processCount = cpuCount / 2;
        }
        let repoRoot = findRepoRoot(filePath);
        if (!repoRoot) {
            throw new Error('File does not exist inside a git repo');
        }
        const chunkSize = Math.ceil(hashes.length / processCount);
        const chunkedHashes = _.chunk(hashes, chunkSize);
        const promises = chunkedHashes.map(hashes => {
            return runGitCommand(repoRoot, `show --format==@COMMIT@=%n%H%n%ae%n%an%n%B --shortstat ${hashes.join(' ')}`);
        });
        return Promise.all(promises).then(results => {
            const parsed = results.map(result => {
                const commits = result.split('=@COMMIT@=');
                commits.shift();
                let parsedCommits = [];
                for (const i in commits) {
                    const lines = commits[i].trim().split('\n');
                    const stats = lines.pop();
                    const matchedStats = stats.match(/\D+(\d+)\D+(\d+)?\D+(\d+)?/);
                    let commit = {
                        hash: lines.shift(),
                        email: lines.shift(),
                        author: lines.shift(),
                        subject: lines.shift(),
                        message: lines.join('\n').trim(),
                        filesChanged: 0,
                        insertions: 0,
                        deletions: 0,
                    };
                    if (matchedStats) {
                        commit.filesChanged = matchedStats[1] || 0;
                        commit.insertions = matchedStats[2] || 0;
                        commit.deletions = matchedStats[3] || 0;
                    }
                    parsedCommits.push(commit);
                }
                return parsedCommits;
            });
            return [].concat.apply([], parsed);
        });
    });
}
export default show;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9naXQvc2hvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7Ozs7Ozs7OztBQUVaLE9BQU8sYUFBYSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDcEIsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxhQUFhLE1BQU0sa0JBQWtCLENBQUM7QUFFbEQsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxjQUFvQixRQUFRLEVBQUUsTUFBTTs7UUFDbEMsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQy9ELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLFlBQVksR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCxJQUFJLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFDMUQsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMxQyxNQUFNLENBQUMsYUFBYSxDQUNsQixRQUFRLEVBQ1IsMERBQTBELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDN0UsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN4QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQzFCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxNQUFNLEdBQUc7d0JBQ1gsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUU7d0JBQ25CLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFO3dCQUNwQixNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRTt3QkFDckIsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUU7d0JBQ3RCLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTt3QkFDaEMsWUFBWSxFQUFFLENBQUM7d0JBQ2YsVUFBVSxFQUFFLENBQUM7d0JBQ2IsU0FBUyxFQUFFLENBQUM7cUJBQ2IsQ0FBQztvQkFDRixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixNQUFNLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzNDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDekMsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxQyxDQUFDO29CQUNELGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzdCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQUE7QUFFRCxlQUFlLElBQUksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5pbXBvcnQgcnVuR2l0Q29tbWFuZCBmcm9tICcuL3J1bkNvbW1hbmQnO1xuaW1wb3J0IGZpbmRSZXBvUm9vdCBmcm9tICcuL2ZpbmRSZXBvUm9vdCc7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIENvbmZpZ01hbmFnZXIgZnJvbSAnLi4vQ29uZmlnTWFuYWdlcic7XG5cbmNvbnN0IGNwdUNvdW50ID0gb3MuY3B1cygpLmxlbmd0aDtcbmFzeW5jIGZ1bmN0aW9uIHNob3coZmlsZVBhdGgsIGhhc2hlcykge1xuICBjb25zdCB1c2VQYXJhbGxlbCA9IENvbmZpZ01hbmFnZXIuZ2V0KCdwYXJhbGxlbEdpdFByb2Nlc3NpbmcnKTtcbiAgbGV0IHByb2Nlc3NDb3VudCA9IDE7XG4gIGlmICh1c2VQYXJhbGxlbCkge1xuICAgIHByb2Nlc3NDb3VudCA9IGNwdUNvdW50IC8gMjtcbiAgfVxuXG4gIGxldCByZXBvUm9vdCA9IGZpbmRSZXBvUm9vdChmaWxlUGF0aCk7XG4gIGlmICghcmVwb1Jvb3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpbGUgZG9lcyBub3QgZXhpc3QgaW5zaWRlIGEgZ2l0IHJlcG8nKTtcbiAgfVxuICBjb25zdCBjaHVua1NpemUgPSBNYXRoLmNlaWwoaGFzaGVzLmxlbmd0aCAvIHByb2Nlc3NDb3VudCk7XG4gIGNvbnN0IGNodW5rZWRIYXNoZXMgPSBfLmNodW5rKGhhc2hlcywgY2h1bmtTaXplKTtcbiAgY29uc3QgcHJvbWlzZXMgPSBjaHVua2VkSGFzaGVzLm1hcChoYXNoZXMgPT4ge1xuICAgIHJldHVybiBydW5HaXRDb21tYW5kKFxuICAgICAgcmVwb1Jvb3QsXG4gICAgICBgc2hvdyAtLWZvcm1hdD09QENPTU1JVEA9JW4lSCVuJWFlJW4lYW4lbiVCIC0tc2hvcnRzdGF0ICR7aGFzaGVzLmpvaW4oJyAnKX1gXG4gICAgKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlc3VsdHMgPT4ge1xuICAgIGNvbnN0IHBhcnNlZCA9IHJlc3VsdHMubWFwKHJlc3VsdCA9PiB7XG4gICAgICBjb25zdCBjb21taXRzID0gcmVzdWx0LnNwbGl0KCc9QENPTU1JVEA9Jyk7XG4gICAgICBjb21taXRzLnNoaWZ0KCk7XG4gICAgICBsZXQgcGFyc2VkQ29tbWl0cyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpIGluIGNvbW1pdHMpIHtcbiAgICAgICAgY29uc3QgbGluZXMgPSBjb21taXRzW2ldLnRyaW0oKS5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGNvbnN0IHN0YXRzID0gbGluZXMucG9wKCk7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRTdGF0cyA9IHN0YXRzLm1hdGNoKC9cXEQrKFxcZCspXFxEKyhcXGQrKT9cXEQrKFxcZCspPy8pO1xuICAgICAgICBsZXQgY29tbWl0ID0ge1xuICAgICAgICAgIGhhc2g6IGxpbmVzLnNoaWZ0KCksXG4gICAgICAgICAgZW1haWw6IGxpbmVzLnNoaWZ0KCksXG4gICAgICAgICAgYXV0aG9yOiBsaW5lcy5zaGlmdCgpLFxuICAgICAgICAgIHN1YmplY3Q6IGxpbmVzLnNoaWZ0KCksXG4gICAgICAgICAgbWVzc2FnZTogbGluZXMuam9pbignXFxuJykudHJpbSgpLFxuICAgICAgICAgIGZpbGVzQ2hhbmdlZDogMCxcbiAgICAgICAgICBpbnNlcnRpb25zOiAwLFxuICAgICAgICAgIGRlbGV0aW9uczogMCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG1hdGNoZWRTdGF0cykge1xuICAgICAgICAgIGNvbW1pdC5maWxlc0NoYW5nZWQgPSBtYXRjaGVkU3RhdHNbMV0gfHwgMDtcbiAgICAgICAgICBjb21taXQuaW5zZXJ0aW9ucyA9IG1hdGNoZWRTdGF0c1syXSB8fCAwO1xuICAgICAgICAgIGNvbW1pdC5kZWxldGlvbnMgPSBtYXRjaGVkU3RhdHNbM10gfHwgMDtcbiAgICAgICAgfVxuICAgICAgICBwYXJzZWRDb21taXRzLnB1c2goY29tbWl0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJzZWRDb21taXRzO1xuICAgIH0pO1xuICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIHBhcnNlZCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaG93O1xuIl19