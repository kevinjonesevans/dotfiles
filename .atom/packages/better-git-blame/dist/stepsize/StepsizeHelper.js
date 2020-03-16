'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import os from 'os';
import uuid from 'uuid-v4';
import * as https from 'https';
import * as childProcess from 'child_process';
class StepsizeHelper {
    static rangesToSelectedLineNumbers(ranges) {
        if (ranges) {
            return ranges
                .map(range => {
                let numbers = [];
                for (let i = range.start.row; i < range.end.row; i = i + 1) {
                    numbers.push(i + 1);
                }
                return numbers;
            })
                .reduce((acc, val) => {
                return acc.concat(val);
            }, []);
        }
        return [];
    }
    static fetchIntegrationData(repoMetadata, commitHashes) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                searchId: uuid(),
                repoName: repoMetadata.repoName,
                repoOwner: repoMetadata.repoOwner,
                repoSource: repoMetadata.repoSource,
                repoSourceBaseUrl: repoMetadata.repoSourceBaseUrl,
                commitHashes,
            };
            return new Promise((resolve, reject) => {
                let responseData = '';
                const req = https.request({
                    hostname: 'production-layer.stepsize.com',
                    path: '/augment-code-search-results',
                    method: 'POST',
                    headers: {
                        'User-Agent': 'Better-Git-Blame-Atom',
                        'Content-Type': 'application/json',
                        'Content-Length': new Buffer(JSON.stringify(payload)).byteLength,
                    },
                }, function (response) {
                    let code = response.statusCode;
                    response.on('data', function (chunk) {
                        responseData += chunk;
                    });
                    response.on('end', function () {
                        if (code < 400) {
                            resolve(JSON.parse(responseData));
                        }
                        else {
                            reject(responseData);
                        }
                    });
                });
                req.on('error', function (error) {
                    reject({ function: 'fetchIntegrationData', message: error.message });
                });
                req.write(JSON.stringify(payload));
                req.end();
            });
        });
    }
    static checkLayerInstallation() {
        return new Promise((resolve, reject) => {
            if (os.platform() !== 'darwin')
                reject();
            const appSupport = `${process.env.HOME}/Library/Application Support`;
            childProcess.exec("ls | grep 'Layer'", { cwd: appSupport }, err => {
                if (err) {
                    return reject(new Error('Could not detect Layer installation'));
                }
                resolve();
            });
        });
    }
    static checkLayerRunning() {
        return new Promise((resolve, reject) => {
            childProcess.exec('pgrep Layer', { cwd: '/' }, err => {
                if (err) {
                    return reject(new Error("No process with name 'Layer' is running"));
                }
                resolve();
            });
        });
    }
}
export default StepsizeHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RlcHNpemVIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc3RlcHNpemUvU3RlcHNpemVIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDOzs7Ozs7Ozs7QUFFWixPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDcEIsT0FBTyxJQUFJLE1BQU0sU0FBUyxDQUFDO0FBQzNCLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBRzlDO0lBQ1MsTUFBTSxDQUFDLDJCQUEyQixDQUFDLE1BQXFCO1FBQzdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsTUFBTTtpQkFDVixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDM0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNqQixDQUFDLENBQUM7aUJBQ0QsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFTSxNQUFNLENBQU8sb0JBQW9CLENBQUMsWUFB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QUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNuRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO2dCQUNELE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUVELGVBQWUsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkLXY0JztcbmltcG9ydCAqIGFzIGh0dHBzIGZyb20gJ2h0dHBzJztcbmltcG9ydCAqIGFzIGNoaWxkUHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBJUmFuZ2UgPSBUZXh0QnVmZmVyLklSYW5nZTtcblxuY2xhc3MgU3RlcHNpemVIZWxwZXIge1xuICBwdWJsaWMgc3RhdGljIHJhbmdlc1RvU2VsZWN0ZWRMaW5lTnVtYmVycyhyYW5nZXM6IEFycmF5PElSYW5nZT4pIHtcbiAgICBpZiAocmFuZ2VzKSB7XG4gICAgICByZXR1cm4gcmFuZ2VzXG4gICAgICAgIC5tYXAocmFuZ2UgPT4ge1xuICAgICAgICAgIGxldCBudW1iZXJzID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IHJhbmdlLnN0YXJ0LnJvdzsgaSA8IHJhbmdlLmVuZC5yb3c7IGkgPSBpICsgMSkge1xuICAgICAgICAgICAgbnVtYmVycy5wdXNoKGkgKyAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG51bWJlcnM7XG4gICAgICAgIH0pXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQodmFsKTtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGZldGNoSW50ZWdyYXRpb25EYXRhKHJlcG9NZXRhZGF0YSwgY29tbWl0SGFzaGVzKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgc2VhcmNoSWQ6IHV1aWQoKSxcbiAgICAgIHJlcG9OYW1lOiByZXBvTWV0YWRhdGEucmVwb05hbWUsXG4gICAgICByZXBvT3duZXI6IHJlcG9NZXRhZGF0YS5yZXBvT3duZXIsXG4gICAgICByZXBvU291cmNlOiByZXBvTWV0YWRhdGEucmVwb1NvdXJjZSxcbiAgICAgIHJlcG9Tb3VyY2VCYXNlVXJsOiByZXBvTWV0YWRhdGEucmVwb1NvdXJjZUJhc2VVcmwsXG4gICAgICBjb21taXRIYXNoZXMsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHJlc3BvbnNlRGF0YSA9ICcnO1xuICAgICAgY29uc3QgcmVxID0gaHR0cHMucmVxdWVzdChcbiAgICAgICAge1xuICAgICAgICAgIGhvc3RuYW1lOiAncHJvZHVjdGlvbi1sYXllci5zdGVwc2l6ZS5jb20nLFxuICAgICAgICAgIHBhdGg6ICcvYXVnbWVudC1jb2RlLXNlYXJjaC1yZXN1bHRzJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnVXNlci1BZ2VudCc6ICdCZXR0ZXItR2l0LUJsYW1lLUF0b20nLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LUxlbmd0aCc6IG5ldyBCdWZmZXIoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBsZXQgY29kZSA9IHJlc3BvbnNlLnN0YXR1c0NvZGU7XG4gICAgICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCBmdW5jdGlvbihjaHVuaykge1xuICAgICAgICAgICAgcmVzcG9uc2VEYXRhICs9IGNodW5rO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjb2RlIDwgNDAwKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZURhdGEpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIHJlamVjdCh7IGZ1bmN0aW9uOiAnZmV0Y2hJbnRlZ3JhdGlvbkRhdGEnLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICAgICAgfSk7XG4gICAgICByZXEud3JpdGUoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xuICAgICAgcmVxLmVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjaGVja0xheWVySW5zdGFsbGF0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAob3MucGxhdGZvcm0oKSAhPT0gJ2RhcndpbicpIHJlamVjdCgpO1xuICAgICAgY29uc3QgYXBwU3VwcG9ydCA9IGAke3Byb2Nlc3MuZW52LkhPTUV9L0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydGA7XG4gICAgICBjaGlsZFByb2Nlc3MuZXhlYyhcImxzIHwgZ3JlcCAnTGF5ZXInXCIsIHsgY3dkOiBhcHBTdXBwb3J0IH0sIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignQ291bGQgbm90IGRldGVjdCBMYXllciBpbnN0YWxsYXRpb24nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNoZWNrTGF5ZXJSdW5uaW5nKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjaGlsZFByb2Nlc3MuZXhlYygncGdyZXAgTGF5ZXInLCB7IGN3ZDogJy8nIH0sIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIHByb2Nlc3Mgd2l0aCBuYW1lICdMYXllcicgaXMgcnVubmluZ1wiKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RlcHNpemVIZWxwZXI7XG4iXX0=