'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StepsizeHelper from '../stepsize/StepsizeHelper';
import * as GitData from './GitData';
import db from './database';
import GitHelper from '../git/GitHelper';
import * as IntegrationNotification from '../interface/IntegrationNotification';
let pendingRequests = {};
export function getIntegrationDataForFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const repoPath = yield GitData.getRepoRootPath(filePath);
        const metadata = yield GitData.getRepoMetadata(repoPath);
        const blame = yield GitData.getBlameForFile(filePath);
        if (!pendingRequests[repoPath]) {
            pendingRequests[repoPath] = StepsizeHelper.fetchIntegrationData(metadata, GitHelper.getHashesFromBlame(blame.lines))
                .then(response => {
                return processIntegrationData(response);
            })
                .catch(e => console.info(e));
        }
        const response = yield pendingRequests[repoPath];
        delete pendingRequests[repoPath];
        return response;
    });
}
function processIntegrationData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const issues = data.issues;
        db
            .get('issues')
            .merge(issues)
            .uniqBy('key')
            .write();
        const pullRequests = data.pullRequests;
        pullRequestsCommitsPivot(pullRequests);
        for (const pullRequestIdx of Object.keys(pullRequests)) {
            const pullRequest = pullRequests[pullRequestIdx];
            const existingPullRequest = db
                .get('pullRequests')
                .find({ number: pullRequest.number })
                .value();
            if (existingPullRequest) {
                continue;
            }
            const toWrite = Object.assign({}, pullRequest);
            toWrite.commitCount = toWrite.commits.length;
            toWrite.relatedIssueKeys = data.pullRequestToIssues[pullRequestIdx].map(idx => issues[idx].key);
            db
                .get('pullRequests')
                .push(toWrite)
                .write();
        }
        for (const commit of data.commits) {
            GitData.updateCommit(commit.commitHash, { buildStatus: commit.buildStatus });
        }
        IntegrationNotification.checkIntegrationDataRetrieved(pullRequests, issues);
        return db.get('pullRequests').value();
    });
}
function pullRequestsCommitsPivot(pullRequests) {
    const pivot = !pullRequests
        ? {}
        : pullRequests.reduce((acc, pullRequest) => {
            acc[pullRequest.number] = pullRequest.commits.map(commit => commit.commitHash);
            return acc;
        }, {});
    db
        .get('pullRequestsCommitsPivot')
        .merge(pivot)
        .uniq()
        .write();
    return db.get('pullRequestsCommitsPivot').value();
}
export function getPullRequestsForCommit(filePath, commitHash) {
    return __awaiter(this, void 0, void 0, function* () {
        if (pendingRequests[filePath]) {
            yield pendingRequests[filePath];
        }
        const results = db
            .get('pullRequestsCommitsPivot')
            .reduce((acc, hashes, prNumber) => {
            if (hashes.includes(commitHash)) {
                acc.push(prNumber);
            }
            return acc;
        }, [])
            .value();
        return results.map(number => {
            return db
                .get('pullRequests')
                .find({ number: parseInt(number) })
                .value();
        });
    });
}
export function getCommitsForPullRequest(filePath, pullRequestNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        if (pendingRequests[filePath]) {
            yield pendingRequests[filePath];
        }
        return db
            .get('pullRequestsCommitsPivot')
            .get(pullRequestNumber)
            .value();
    });
}
export function getIssue(filePath, issueKey) {
    return __awaiter(this, void 0, void 0, function* () {
        if (pendingRequests[filePath]) {
            yield pendingRequests[filePath];
        }
        return db
            .get('issues')
            .find({ key: issueKey })
            .value();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZWdyYXRpb25EYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2RhdGEvSW50ZWdyYXRpb25EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7Ozs7O0FBRVosT0FBTyxjQUFjLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxXQUFXLENBQUM7QUFDckMsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTVCLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sS0FBSyx1QkFBdUIsTUFBTSxzQ0FBc0MsQ0FBQztBQUVoRixJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFFekIsTUFBTSxvQ0FBMEMsUUFBZ0I7O1FBQzlELE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekQsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsY0FBYyxDQUFDLG9CQUFvQixDQUM3RCxRQUFRLEVBQ1IsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDMUM7aUJBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNmLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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O0lBQ2IsQ0FBQztDQUFBO0FBRUQsTUFBTSxtQkFBeUIsUUFBZ0IsRUFBRSxRQUF5Qjs7UUFDeEUsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUU7YUFDTixHQUFHLENBQUMsUUFBUSxDQUFDO2FBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDO2FBQ3ZCLEtBQUssRUFBRSxDQUFDO0lBQ2IsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCBTdGVwc2l6ZUhlbHBlciBmcm9tICcuLi9zdGVwc2l6ZS9TdGVwc2l6ZUhlbHBlcic7XG5pbXBvcnQgKiBhcyBHaXREYXRhIGZyb20gJy4vR2l0RGF0YSc7XG5pbXBvcnQgZGIgZnJvbSAnLi9kYXRhYmFzZSc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEdpdEhlbHBlciBmcm9tICcuLi9naXQvR2l0SGVscGVyJztcbmltcG9ydCAqIGFzIEludGVncmF0aW9uTm90aWZpY2F0aW9uIGZyb20gJy4uL2ludGVyZmFjZS9JbnRlZ3JhdGlvbk5vdGlmaWNhdGlvbic7XG5cbmxldCBwZW5kaW5nUmVxdWVzdHMgPSB7fTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEludGVncmF0aW9uRGF0YUZvckZpbGUoZmlsZVBhdGg6IHN0cmluZykge1xuICBjb25zdCByZXBvUGF0aCA9IGF3YWl0IEdpdERhdGEuZ2V0UmVwb1Jvb3RQYXRoKGZpbGVQYXRoKTtcbiAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBHaXREYXRhLmdldFJlcG9NZXRhZGF0YShyZXBvUGF0aCk7XG4gIGNvbnN0IGJsYW1lID0gYXdhaXQgR2l0RGF0YS5nZXRCbGFtZUZvckZpbGUoZmlsZVBhdGgpO1xuICBpZiAoIXBlbmRpbmdSZXF1ZXN0c1tyZXBvUGF0aF0pIHtcbiAgICBwZW5kaW5nUmVxdWVzdHNbcmVwb1BhdGhdID0gU3RlcHNpemVIZWxwZXIuZmV0Y2hJbnRlZ3JhdGlvbkRhdGEoXG4gICAgICBtZXRhZGF0YSxcbiAgICAgIEdpdEhlbHBlci5nZXRIYXNoZXNGcm9tQmxhbWUoYmxhbWUubGluZXMpXG4gICAgKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc0ludGVncmF0aW9uRGF0YShyZXNwb25zZSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGUgPT4gY29uc29sZS5pbmZvKGUpKTtcbiAgfVxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHBlbmRpbmdSZXF1ZXN0c1tyZXBvUGF0aF07XG4gIGRlbGV0ZSBwZW5kaW5nUmVxdWVzdHNbcmVwb1BhdGhdO1xuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NJbnRlZ3JhdGlvbkRhdGEoZGF0YSkge1xuICBjb25zdCBpc3N1ZXMgPSBkYXRhLmlzc3VlcztcbiAgZGJcbiAgICAuZ2V0KCdpc3N1ZXMnKVxuICAgIC5tZXJnZShpc3N1ZXMpXG4gICAgLnVuaXFCeSgna2V5JylcbiAgICAud3JpdGUoKTtcbiAgY29uc3QgcHVsbFJlcXVlc3RzID0gZGF0YS5wdWxsUmVxdWVzdHM7XG4gIHB1bGxSZXF1ZXN0c0NvbW1pdHNQaXZvdChwdWxsUmVxdWVzdHMpO1xuICBmb3IgKGNvbnN0IHB1bGxSZXF1ZXN0SWR4IG9mIE9iamVjdC5rZXlzKHB1bGxSZXF1ZXN0cykpIHtcbiAgICBjb25zdCBwdWxsUmVxdWVzdCA9IHB1bGxSZXF1ZXN0c1twdWxsUmVxdWVzdElkeF07XG4gICAgY29uc3QgZXhpc3RpbmdQdWxsUmVxdWVzdCA9IGRiXG4gICAgICAuZ2V0KCdwdWxsUmVxdWVzdHMnKVxuICAgICAgLmZpbmQoeyBudW1iZXI6IHB1bGxSZXF1ZXN0Lm51bWJlciB9KVxuICAgICAgLnZhbHVlKCk7XG4gICAgaWYgKGV4aXN0aW5nUHVsbFJlcXVlc3QpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCB0b1dyaXRlID0geyAuLi5wdWxsUmVxdWVzdCB9O1xuICAgIHRvV3JpdGUuY29tbWl0Q291bnQgPSB0b1dyaXRlLmNvbW1pdHMubGVuZ3RoO1xuICAgIHRvV3JpdGUucmVsYXRlZElzc3VlS2V5cyA9IGRhdGEucHVsbFJlcXVlc3RUb0lzc3Vlc1twdWxsUmVxdWVzdElkeF0ubWFwKGlkeCA9PiBpc3N1ZXNbaWR4XS5rZXkpO1xuICAgIGRiXG4gICAgICAuZ2V0KCdwdWxsUmVxdWVzdHMnKVxuICAgICAgLnB1c2godG9Xcml0ZSlcbiAgICAgIC53cml0ZSgpO1xuICB9XG4gIGZvciAoY29uc3QgY29tbWl0IG9mIGRhdGEuY29tbWl0cykge1xuICAgIEdpdERhdGEudXBkYXRlQ29tbWl0KGNvbW1pdC5jb21taXRIYXNoLCB7IGJ1aWxkU3RhdHVzOiBjb21taXQuYnVpbGRTdGF0dXMgfSk7XG4gIH1cbiAgSW50ZWdyYXRpb25Ob3RpZmljYXRpb24uY2hlY2tJbnRlZ3JhdGlvbkRhdGFSZXRyaWV2ZWQocHVsbFJlcXVlc3RzLCBpc3N1ZXMpO1xuICByZXR1cm4gZGIuZ2V0KCdwdWxsUmVxdWVzdHMnKS52YWx1ZSgpO1xufVxuXG5mdW5jdGlvbiBwdWxsUmVxdWVzdHNDb21taXRzUGl2b3QocHVsbFJlcXVlc3RzKSB7XG4gIGNvbnN0IHBpdm90ID0gIXB1bGxSZXF1ZXN0c1xuICAgID8ge31cbiAgICA6IHB1bGxSZXF1ZXN0cy5yZWR1Y2UoKGFjYywgcHVsbFJlcXVlc3QpID0+IHtcbiAgICAgICAgYWNjW3B1bGxSZXF1ZXN0Lm51bWJlcl0gPSBwdWxsUmVxdWVzdC5jb21taXRzLm1hcChjb21taXQgPT4gY29tbWl0LmNvbW1pdEhhc2gpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuICBkYlxuICAgIC5nZXQoJ3B1bGxSZXF1ZXN0c0NvbW1pdHNQaXZvdCcpXG4gICAgLm1lcmdlKHBpdm90KVxuICAgIC51bmlxKClcbiAgICAud3JpdGUoKTtcbiAgcmV0dXJuIGRiLmdldCgncHVsbFJlcXVlc3RzQ29tbWl0c1Bpdm90JykudmFsdWUoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFB1bGxSZXF1ZXN0c0ZvckNvbW1pdChmaWxlUGF0aDogc3RyaW5nLCBjb21taXRIYXNoOiBzdHJpbmcpIHtcbiAgaWYgKHBlbmRpbmdSZXF1ZXN0c1tmaWxlUGF0aF0pIHtcbiAgICBhd2FpdCBwZW5kaW5nUmVxdWVzdHNbZmlsZVBhdGhdO1xuICB9XG4gIGNvbnN0IHJlc3VsdHMgPSBkYlxuICAgIC5nZXQoJ3B1bGxSZXF1ZXN0c0NvbW1pdHNQaXZvdCcpXG4gICAgLnJlZHVjZSgoYWNjLCBoYXNoZXMsIHByTnVtYmVyKSA9PiB7XG4gICAgICBpZiAoaGFzaGVzLmluY2x1ZGVzKGNvbW1pdEhhc2gpKSB7XG4gICAgICAgIGFjYy5wdXNoKHByTnVtYmVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgW10pXG4gICAgLnZhbHVlKCk7XG4gIHJldHVybiByZXN1bHRzLm1hcChudW1iZXIgPT4ge1xuICAgIHJldHVybiBkYlxuICAgICAgLmdldCgncHVsbFJlcXVlc3RzJylcbiAgICAgIC5maW5kKHsgbnVtYmVyOiBwYXJzZUludChudW1iZXIpIH0pXG4gICAgICAudmFsdWUoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb21taXRzRm9yUHVsbFJlcXVlc3QoXG4gIGZpbGVQYXRoOiBzdHJpbmcsXG4gIHB1bGxSZXF1ZXN0TnVtYmVyOiBzdHJpbmcgfCBudW1iZXJcbikge1xuICBpZiAocGVuZGluZ1JlcXVlc3RzW2ZpbGVQYXRoXSkge1xuICAgIGF3YWl0IHBlbmRpbmdSZXF1ZXN0c1tmaWxlUGF0aF07XG4gIH1cbiAgcmV0dXJuIGRiXG4gICAgLmdldCgncHVsbFJlcXVlc3RzQ29tbWl0c1Bpdm90JylcbiAgICAuZ2V0KHB1bGxSZXF1ZXN0TnVtYmVyKVxuICAgIC52YWx1ZSgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SXNzdWUoZmlsZVBhdGg6IHN0cmluZywgaXNzdWVLZXk6IHN0cmluZyB8IG51bWJlcikge1xuICBpZiAocGVuZGluZ1JlcXVlc3RzW2ZpbGVQYXRoXSkge1xuICAgIGF3YWl0IHBlbmRpbmdSZXF1ZXN0c1tmaWxlUGF0aF07XG4gIH1cbiAgcmV0dXJuIGRiXG4gICAgLmdldCgnaXNzdWVzJylcbiAgICAuZmluZCh7IGtleTogaXNzdWVLZXkgfSlcbiAgICAudmFsdWUoKTtcbn1cbiJdfQ==