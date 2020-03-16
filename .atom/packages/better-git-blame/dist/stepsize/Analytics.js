'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import email from '../git/email';
import crypto from 'crypto';
import os from 'os';
import * as https from 'https';
import * as ConfigManager from '../ConfigManager';
import { version } from '../../package.json';
export let userHash;
const writeKey = '3hotv1JuhWEvL5H0SSUpJzVHgcRlurnB';
const authHeader = `Basic ${new Buffer(`${writeKey}:`).toString('base64')}`;
let analyticsFailing = false;
function segmentRequest(path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        let payload = body;
        payload.timestamp = new Date().toISOString();
        payload.context = {
            app: {
                name: 'Atom Better Git Blame',
                version: version,
            },
            os: {
                name: os.type(),
                version: os.release(),
            },
        };
        const requestData = {
            hostname: 'api.segment.io',
            path: `/v1${path}`,
            method: 'POST',
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
            },
        };
        return new Promise((resolve, reject) => {
            let responseData = '';
            const req = https.request(requestData, function (response) {
                let code = response.statusCode;
                response.on('data', function (chunk) {
                    responseData += chunk;
                });
                response.on('end', function () {
                    if (code < 400) {
                        resolve(JSON.parse(responseData));
                    }
                    else {
                        reject({ payload, requestData, responseData: JSON.parse(responseData) });
                    }
                });
            });
            req.on('error', function (error) {
                reject({ payload, requestData, errorMessage: error.message });
            });
            req.write(JSON.stringify(payload));
            req.end();
        });
    });
}
function getUserHash() {
    return __awaiter(this, void 0, void 0, function* () {
        let savedHash = localStorage.getItem('better-git-blame-analytics-hash');
        if (savedHash) {
            return savedHash;
        }
        let userEmail;
        try {
            userEmail = yield email();
        }
        catch (e) {
            console.info(e);
        }
        if (!userEmail) {
            try {
                userEmail = crypto.randomBytes(28);
            }
            catch (e) {
                console.error(e);
            }
        }
        if (!userEmail)
            throw new Error('Failed to fetch email or create fallback');
        const hash = crypto.createHash('sha256');
        hash.update(userEmail);
        const hashedEmail = hash.digest('hex');
        localStorage.setItem('better-git-blame-analytics-hash', hashedEmail);
        return hashedEmail;
    });
}
export function init() {
    return __awaiter(this, void 0, void 0, function* () {
        if (ConfigManager.get('sendUsageStatistics')) {
            userHash = yield getUserHash();
            if (userHash) {
                const randomString = crypto.randomBytes(8).toString('hex');
                const configKeys = Object.keys(ConfigManager.getConfig());
                let pluginConfig = {};
                for (let i in configKeys) {
                    const key = configKeys[i];
                    pluginConfig[`BGB Config ${key}`] = ConfigManager.get(key);
                    ConfigManager.onDidChange(key, value => {
                        track('Changed config', {
                            Config: key,
                            'Old Value': value.oldValue,
                            'New Value': value.newValue,
                        });
                    });
                }
                try {
                    yield segmentRequest('/identify', {
                        userId: userHash,
                        traits: Object.assign({ 'User Hash': userHash, name: `Plugin User ${randomString}` }, pluginConfig),
                    });
                }
                catch (e) {
                    console.info(e);
                    analyticsFailing = true;
                }
            }
        }
    });
}
export function track(name, data = {}) {
    if (ConfigManager.get('sendUsageStatistics') && userHash && !analyticsFailing) {
        segmentRequest('/track', {
            event: `BGB ${name}`,
            userId: userHash,
            properties: data,
        }).catch(e => {
            console.info(e);
            analyticsFailing = true;
        });
    }
}
export function anonymiseRepoMetadata(metadata) {
    const anonymiseField = (field) => {
        const hash = crypto.createHash('sha256');
        hash.update(field);
        return hash.digest('hex');
    };
    return {
        repoNameHash: anonymiseField(metadata.repoName),
        repoOwnerHash: anonymiseField(metadata.repoOwner),
        repoSourceHash: anonymiseField(metadata.repoSource),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3N0ZXBzaXplL0FuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7Ozs7Ozs7OztBQUVaLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUNqQyxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3BCLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxhQUFhLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTdDLE1BQU0sQ0FBQyxJQUFJLFFBQWdCLENBQUM7QUFFNUIsTUFBTSxRQUFRLEdBQVcsa0NBQWtDLENBQUM7QUFDNUQsTUFBTSxVQUFVLEdBQVcsU0FBUyxJQUFJLE1BQU0sQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7QUFDcEYsSUFBSSxnQkFBZ0IsR0FBWSxLQUFLLENBQUM7QUFFdEMsd0JBQThCLElBQUksRUFBRSxJQUFJOztRQUN0QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxPQUFPLEdBQUc7WUFDaEIsR0FBRyxFQUFFO2dCQUNILElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLE9BQU8sRUFBRSxPQUFPO2FBQ2pCO1lBQ0QsRUFBRSxFQUFFO2dCQUNGLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFO2dCQUNmLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFO2FBQ3RCO1NBQ0YsQ0FBQztRQUNGLE1BQU0sV0FBVyxHQUFHO1lBQ2xCLFFBQVEsRUFBRSxn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QUFFLGNBQWMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQy9DLGFBQWEsRUFBRSxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUNqRCxjQUFjLEVBQUUsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7S0FDcEQsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IGVtYWlsIGZyb20gJy4uL2dpdC9lbWFpbCc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0ICogYXMgaHR0cHMgZnJvbSAnaHR0cHMnO1xuaW1wb3J0ICogYXMgQ29uZmlnTWFuYWdlciBmcm9tICcuLi9Db25maWdNYW5hZ2VyJztcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuXG5leHBvcnQgbGV0IHVzZXJIYXNoOiBzdHJpbmc7XG5cbmNvbnN0IHdyaXRlS2V5OiBzdHJpbmcgPSAnM2hvdHYxSnVoV0V2TDVIMFNTVXBKelZIZ2NSbHVybkInO1xuY29uc3QgYXV0aEhlYWRlcjogc3RyaW5nID0gYEJhc2ljICR7bmV3IEJ1ZmZlcihgJHt3cml0ZUtleX06YCkudG9TdHJpbmcoJ2Jhc2U2NCcpfWA7XG5sZXQgYW5hbHl0aWNzRmFpbGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG5hc3luYyBmdW5jdGlvbiBzZWdtZW50UmVxdWVzdChwYXRoLCBib2R5KTogUHJvbWlzZTxhbnk+IHtcbiAgbGV0IHBheWxvYWQgPSBib2R5O1xuICBwYXlsb2FkLnRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgcGF5bG9hZC5jb250ZXh0ID0ge1xuICAgIGFwcDoge1xuICAgICAgbmFtZTogJ0F0b20gQmV0dGVyIEdpdCBCbGFtZScsXG4gICAgICB2ZXJzaW9uOiB2ZXJzaW9uLFxuICAgIH0sXG4gICAgb3M6IHtcbiAgICAgIG5hbWU6IG9zLnR5cGUoKSxcbiAgICAgIHZlcnNpb246IG9zLnJlbGVhc2UoKSxcbiAgICB9LFxuICB9O1xuICBjb25zdCByZXF1ZXN0RGF0YSA9IHtcbiAgICBob3N0bmFtZTogJ2FwaS5zZWdtZW50LmlvJyxcbiAgICBwYXRoOiBgL3YxJHtwYXRofWAsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYXV0aEhlYWRlcixcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gJyc7XG4gICAgY29uc3QgcmVxID0gaHR0cHMucmVxdWVzdChyZXF1ZXN0RGF0YSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGxldCBjb2RlID0gcmVzcG9uc2Uuc3RhdHVzQ29kZTtcbiAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgZnVuY3Rpb24oY2h1bmspIHtcbiAgICAgICAgcmVzcG9uc2VEYXRhICs9IGNodW5rO1xuICAgICAgfSk7XG4gICAgICByZXNwb25zZS5vbignZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjb2RlIDwgNDAwKSB7XG4gICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlRGF0YSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdCh7IHBheWxvYWQsIHJlcXVlc3REYXRhLCByZXNwb25zZURhdGE6IEpTT04ucGFyc2UocmVzcG9uc2VEYXRhKSB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICByZWplY3QoeyBwYXlsb2FkLCByZXF1ZXN0RGF0YSwgZXJyb3JNZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICAgIH0pO1xuICAgIHJlcS53cml0ZShKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XG4gICAgcmVxLmVuZCgpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckhhc2goKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgbGV0IHNhdmVkSGFzaCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiZXR0ZXItZ2l0LWJsYW1lLWFuYWx5dGljcy1oYXNoJyk7XG4gIGlmIChzYXZlZEhhc2gpIHtcbiAgICByZXR1cm4gc2F2ZWRIYXNoO1xuICB9XG4gIGxldCB1c2VyRW1haWw7XG4gIHRyeSB7XG4gICAgdXNlckVtYWlsID0gYXdhaXQgZW1haWwoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuaW5mbyhlKTtcbiAgfVxuICBpZiAoIXVzZXJFbWFpbCkge1xuICAgIHRyeSB7XG4gICAgICB1c2VyRW1haWwgPSBjcnlwdG8ucmFuZG9tQnl0ZXMoMjgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgfVxuICB9XG4gIGlmICghdXNlckVtYWlsKSB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBlbWFpbCBvciBjcmVhdGUgZmFsbGJhY2snKTtcbiAgY29uc3QgaGFzaCA9IGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKTtcbiAgaGFzaC51cGRhdGUodXNlckVtYWlsKTtcbiAgY29uc3QgaGFzaGVkRW1haWwgPSBoYXNoLmRpZ2VzdCgnaGV4Jyk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiZXR0ZXItZ2l0LWJsYW1lLWFuYWx5dGljcy1oYXNoJywgaGFzaGVkRW1haWwpO1xuICByZXR1cm4gaGFzaGVkRW1haWw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoQ29uZmlnTWFuYWdlci5nZXQoJ3NlbmRVc2FnZVN0YXRpc3RpY3MnKSkge1xuICAgIHVzZXJIYXNoID0gYXdhaXQgZ2V0VXNlckhhc2goKTtcbiAgICBpZiAodXNlckhhc2gpIHtcbiAgICAgIGNvbnN0IHJhbmRvbVN0cmluZyA9IGNyeXB0by5yYW5kb21CeXRlcyg4KS50b1N0cmluZygnaGV4Jyk7XG4gICAgICBjb25zdCBjb25maWdLZXlzID0gT2JqZWN0LmtleXMoQ29uZmlnTWFuYWdlci5nZXRDb25maWcoKSk7XG4gICAgICBsZXQgcGx1Z2luQ29uZmlnID0ge307XG4gICAgICBmb3IgKGxldCBpIGluIGNvbmZpZ0tleXMpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gY29uZmlnS2V5c1tpXTtcbiAgICAgICAgcGx1Z2luQ29uZmlnW2BCR0IgQ29uZmlnICR7a2V5fWBdID0gQ29uZmlnTWFuYWdlci5nZXQoa2V5KTtcbiAgICAgICAgQ29uZmlnTWFuYWdlci5vbkRpZENoYW5nZShrZXksIHZhbHVlID0+IHtcbiAgICAgICAgICB0cmFjaygnQ2hhbmdlZCBjb25maWcnLCB7XG4gICAgICAgICAgICBDb25maWc6IGtleSxcbiAgICAgICAgICAgICdPbGQgVmFsdWUnOiB2YWx1ZS5vbGRWYWx1ZSxcbiAgICAgICAgICAgICdOZXcgVmFsdWUnOiB2YWx1ZS5uZXdWYWx1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBzZWdtZW50UmVxdWVzdCgnL2lkZW50aWZ5Jywge1xuICAgICAgICAgIHVzZXJJZDogdXNlckhhc2gsXG4gICAgICAgICAgdHJhaXRzOiB7XG4gICAgICAgICAgICAnVXNlciBIYXNoJzogdXNlckhhc2gsXG4gICAgICAgICAgICBuYW1lOiBgUGx1Z2luIFVzZXIgJHtyYW5kb21TdHJpbmd9YCxcbiAgICAgICAgICAgIC4uLnBsdWdpbkNvbmZpZyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKGUpO1xuICAgICAgICBhbmFseXRpY3NGYWlsaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYWNrKG5hbWUsIGRhdGEgPSB7fSk6IHZvaWQge1xuICBpZiAoQ29uZmlnTWFuYWdlci5nZXQoJ3NlbmRVc2FnZVN0YXRpc3RpY3MnKSAmJiB1c2VySGFzaCAmJiAhYW5hbHl0aWNzRmFpbGluZykge1xuICAgIHNlZ21lbnRSZXF1ZXN0KCcvdHJhY2snLCB7XG4gICAgICBldmVudDogYEJHQiAke25hbWV9YCxcbiAgICAgIHVzZXJJZDogdXNlckhhc2gsXG4gICAgICBwcm9wZXJ0aWVzOiBkYXRhLFxuICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgY29uc29sZS5pbmZvKGUpO1xuICAgICAgYW5hbHl0aWNzRmFpbGluZyA9IHRydWU7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQW5vbnltb3VzUmVwb01ldGFkYXRhIHtcbiAgcmVwb05hbWVIYXNoOiBzdHJpbmc7XG4gIHJlcG9Pd25lckhhc2g6IHN0cmluZztcbiAgcmVwb1NvdXJjZUhhc2g6IHN0cmluZztcbn1cbmV4cG9ydCBmdW5jdGlvbiBhbm9ueW1pc2VSZXBvTWV0YWRhdGEobWV0YWRhdGE6IHtcbiAgW3Byb3A6IHN0cmluZ106IHN0cmluZztcbn0pOiBJQW5vbnltb3VzUmVwb01ldGFkYXRhIHtcbiAgY29uc3QgYW5vbnltaXNlRmllbGQgPSAoZmllbGQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgaGFzaCA9IGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKTtcbiAgICBoYXNoLnVwZGF0ZShmaWVsZCk7XG4gICAgcmV0dXJuIGhhc2guZGlnZXN0KCdoZXgnKTtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICByZXBvTmFtZUhhc2g6IGFub255bWlzZUZpZWxkKG1ldGFkYXRhLnJlcG9OYW1lKSxcbiAgICByZXBvT3duZXJIYXNoOiBhbm9ueW1pc2VGaWVsZChtZXRhZGF0YS5yZXBvT3duZXIpLFxuICAgIHJlcG9Tb3VyY2VIYXNoOiBhbm9ueW1pc2VGaWVsZChtZXRhZGF0YS5yZXBvU291cmNlKSxcbiAgfTtcbn1cbiJdfQ==