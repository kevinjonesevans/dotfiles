'use babel';
import _ from 'lodash';
import GitUrlParse from 'git-url-parse';
class GitHelper {
    /**
     * extractRepoMetadataFromRemotes() gets some details about the repo from the remote URLs.
     * Specifically, we get the repo's origin (i.e. code hosting service), its name, its owner, and its
     * root & commit URLs. These details are used later to augment commit-level code search results with
     * data from code hosting & project management integrations.
     *
     * @param   {Array<any>} remotes  Array of remote URLs of the form { url, name, type }
     * @returns {Object}     Object containing the extract repo metadata
     */
    static extractRepoMetadataFromRemotes(remotes) {
        if (!Array.isArray(remotes) || remotes.length === 0)
            return {};
        let parsedUrl;
        try {
            parsedUrl = GitUrlParse(remotes[0].url);
        }
        catch (error) {
            return {};
        }
        const repoMetadata = {
            repoName: parsedUrl.name,
            repoOwner: parsedUrl.owner,
            repoSource: parsedUrl.resource,
            repoSourceBaseUrl: parsedUrl.protocol === 'http'
                ? `http://${parsedUrl.resource}`
                : `https://${parsedUrl.resource}`,
            repoRootUrl: parsedUrl.protocol === 'http'
                ? parsedUrl.toString('http').replace('.git', '')
                : parsedUrl.toString('https').replace('.git', ''),
        };
        // Temporary fix for #29
        const pathHasSingleElement = !parsedUrl.pathname.slice(1).includes('/');
        if (parsedUrl.protocol === 'ssh' && parsedUrl.user === 'git' && pathHasSingleElement) {
            repoMetadata.repoRootUrl = repoMetadata.repoRootUrl.replace('/git/', '/');
        }
        repoMetadata.repoCommitUrl =
            repoMetadata.repoSource === 'bitbucket.org'
                ? `${repoMetadata.repoRootUrl}/commits`
                : `${repoMetadata.repoRootUrl}/commit`;
        return repoMetadata;
    }
    static getHashesFromBlame(blame) {
        return _.uniq(blame.map(line => {
            return line.split(' ')[0];
        }));
    }
    static parseBlameLine(blameLine) {
        /*
                            Commit Hash     Original Line Number               Date                                            Timezone Offset               Line
                                  ^     File Path    ^       Author              ^                           Time                     ^          Line Number   ^
                                  |         ^        |          ^                |                             ^                      |               ^        |
                                  |         |        |          |                |                             |                      |               |        |
                             |---------|  |---|   |------|    |--|   |--------------------------|  |--------------------------|  |------------|   |--------||----|  */
        const blameRegex = /^([a-z0-9]+)\s(\S+)\s+([0-9]+)\s\((.+)\s+([0-9]{4}-[0-9]{2}-[0-9]{2})\s([0-9]{2}:[0-9]{2}:[0-9]{2})\s([+-][0-9]{4})\s+([0-9]+)\)(.+|$)/;
        const matched = blameLine.match(blameRegex);
        if (!matched) {
            console.log(blameLine);
            throw new Error("Couldn't parse blame line");
        }
        return {
            commitHash: matched[1].trim(),
            filePath: matched[2].trim(),
            originalLineNumber: matched[3].trim(),
            lineNumber: matched[8].trim(),
            author: matched[4].trim(),
            commitedAt: new Date(`${matched[5].trim()} ${matched[6].trim()} ${matched[7].trim()}`),
            line: matched[9],
        };
    }
}
export default GitHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2l0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2dpdC9HaXRIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDO0FBRVosT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUV4QztJQUNFOzs7Ozs7OztPQVFHO0lBQ0gsTUFBTSxDQUFDLDhCQUE4QixDQUFDLE9BQW1CO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDL0QsSUFBSSxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUM7WUFDSCxTQUFTLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDWixDQUFDO1FBQ0QsTUFBTSxZQUFZLEdBQTRCO1lBQzVDLFFBQVEsRUFBRSxTQUFTLENBQUMsSUFBSTtZQUN4QixTQUFTLEVBQUUsU0FBUyxDQUFDLEtBQUs7WUFDMUIsVUFBVSxFQUFFLFNBQVMsQ0FBQyxRQUFRO1lBQzlCLGlCQUFpQixFQUNmLFNBQVMsQ0FBQyxRQUFRLEtBQUssTUFBTTtnQkFDM0IsQ0FBQyxDQUFDLFVBQVUsU0FBUyxDQUFDLFFBQVEsRUFBRTtnQkFDaEMsQ0FBQyxDQUFDLFdBQVcsU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUNyQyxXQUFXLEVBQ1QsU0FBUyxDQUFDLFFBQVEsS0FBSyxNQUFNO2dCQUMzQixDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztnQkFDaEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7U0FDdEQsQ0FBQztRQUVGLHdCQUF3QjtRQUN4QixNQUFNLG9CQUFvQixHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEtBQUssS0FBSyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUNyRixZQUFZLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBRUQsWUFBWSxDQUFDLGFBQWE7WUFDeEIsWUFBWSxDQUFDLFVBQVUsS0FBSyxlQUFlO2dCQUN6QyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsV0FBVyxVQUFVO2dCQUN2QyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsV0FBVyxTQUFTLENBQUM7UUFDM0MsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQW9CO1FBQzVDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNYLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUztRQUM3Qjs7Ozs7c0tBSzhKO1FBQzlKLE1BQU0sVUFBVSxHQUFHLHdJQUF3SSxDQUFDO1FBQzVKLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE1BQU0sQ0FBQztZQUNMLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQzdCLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQzNCLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDckMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDN0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDekIsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUN0RixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNqQixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsZUFBZSxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBHaXRVcmxQYXJzZSBmcm9tICdnaXQtdXJsLXBhcnNlJztcblxuY2xhc3MgR2l0SGVscGVyIHtcbiAgLyoqXG4gICAqIGV4dHJhY3RSZXBvTWV0YWRhdGFGcm9tUmVtb3RlcygpIGdldHMgc29tZSBkZXRhaWxzIGFib3V0IHRoZSByZXBvIGZyb20gdGhlIHJlbW90ZSBVUkxzLlxuICAgKiBTcGVjaWZpY2FsbHksIHdlIGdldCB0aGUgcmVwbydzIG9yaWdpbiAoaS5lLiBjb2RlIGhvc3Rpbmcgc2VydmljZSksIGl0cyBuYW1lLCBpdHMgb3duZXIsIGFuZCBpdHNcbiAgICogcm9vdCAmIGNvbW1pdCBVUkxzLiBUaGVzZSBkZXRhaWxzIGFyZSB1c2VkIGxhdGVyIHRvIGF1Z21lbnQgY29tbWl0LWxldmVsIGNvZGUgc2VhcmNoIHJlc3VsdHMgd2l0aFxuICAgKiBkYXRhIGZyb20gY29kZSBob3N0aW5nICYgcHJvamVjdCBtYW5hZ2VtZW50IGludGVncmF0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtICAge0FycmF5PGFueT59IHJlbW90ZXMgIEFycmF5IG9mIHJlbW90ZSBVUkxzIG9mIHRoZSBmb3JtIHsgdXJsLCBuYW1lLCB0eXBlIH1cbiAgICogQHJldHVybnMge09iamVjdH0gICAgIE9iamVjdCBjb250YWluaW5nIHRoZSBleHRyYWN0IHJlcG8gbWV0YWRhdGFcbiAgICovXG4gIHN0YXRpYyBleHRyYWN0UmVwb01ldGFkYXRhRnJvbVJlbW90ZXMocmVtb3RlczogQXJyYXk8YW55Pik6IHsgW3Byb3A6IHN0cmluZ106IGFueSB9IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVtb3RlcykgfHwgcmVtb3Rlcy5sZW5ndGggPT09IDApIHJldHVybiB7fTtcbiAgICBsZXQgcGFyc2VkVXJsO1xuICAgIHRyeSB7XG4gICAgICBwYXJzZWRVcmwgPSBHaXRVcmxQYXJzZShyZW1vdGVzWzBdLnVybCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgY29uc3QgcmVwb01ldGFkYXRhOiB7IFtwcm9wOiBzdHJpbmddOiBhbnkgfSA9IHtcbiAgICAgIHJlcG9OYW1lOiBwYXJzZWRVcmwubmFtZSxcbiAgICAgIHJlcG9Pd25lcjogcGFyc2VkVXJsLm93bmVyLFxuICAgICAgcmVwb1NvdXJjZTogcGFyc2VkVXJsLnJlc291cmNlLCAvLyAucmVzb3VyY2UgaW5jbHVkZSBzdWJkb21haW4sIC5zb3VyY2UgZG9lcyBub3RcbiAgICAgIHJlcG9Tb3VyY2VCYXNlVXJsOlxuICAgICAgICBwYXJzZWRVcmwucHJvdG9jb2wgPT09ICdodHRwJ1xuICAgICAgICAgID8gYGh0dHA6Ly8ke3BhcnNlZFVybC5yZXNvdXJjZX1gXG4gICAgICAgICAgOiBgaHR0cHM6Ly8ke3BhcnNlZFVybC5yZXNvdXJjZX1gLFxuICAgICAgcmVwb1Jvb3RVcmw6XG4gICAgICAgIHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHAnXG4gICAgICAgICAgPyBwYXJzZWRVcmwudG9TdHJpbmcoJ2h0dHAnKS5yZXBsYWNlKCcuZ2l0JywgJycpXG4gICAgICAgICAgOiBwYXJzZWRVcmwudG9TdHJpbmcoJ2h0dHBzJykucmVwbGFjZSgnLmdpdCcsICcnKSxcbiAgICB9O1xuXG4gICAgLy8gVGVtcG9yYXJ5IGZpeCBmb3IgIzI5XG4gICAgY29uc3QgcGF0aEhhc1NpbmdsZUVsZW1lbnQgPSAhcGFyc2VkVXJsLnBhdGhuYW1lLnNsaWNlKDEpLmluY2x1ZGVzKCcvJyk7XG4gICAgaWYgKHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ3NzaCcgJiYgcGFyc2VkVXJsLnVzZXIgPT09ICdnaXQnICYmIHBhdGhIYXNTaW5nbGVFbGVtZW50KSB7XG4gICAgICByZXBvTWV0YWRhdGEucmVwb1Jvb3RVcmwgPSByZXBvTWV0YWRhdGEucmVwb1Jvb3RVcmwucmVwbGFjZSgnL2dpdC8nLCAnLycpO1xuICAgIH1cblxuICAgIHJlcG9NZXRhZGF0YS5yZXBvQ29tbWl0VXJsID1cbiAgICAgIHJlcG9NZXRhZGF0YS5yZXBvU291cmNlID09PSAnYml0YnVja2V0Lm9yZydcbiAgICAgICAgPyBgJHtyZXBvTWV0YWRhdGEucmVwb1Jvb3RVcmx9L2NvbW1pdHNgXG4gICAgICAgIDogYCR7cmVwb01ldGFkYXRhLnJlcG9Sb290VXJsfS9jb21taXRgO1xuICAgIHJldHVybiByZXBvTWV0YWRhdGE7XG4gIH1cblxuICBzdGF0aWMgZ2V0SGFzaGVzRnJvbUJsYW1lKGJsYW1lOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgcmV0dXJuIF8udW5pcShcbiAgICAgIGJsYW1lLm1hcChsaW5lID0+IHtcbiAgICAgICAgcmV0dXJuIGxpbmUuc3BsaXQoJyAnKVswXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUJsYW1lTGluZShibGFtZUxpbmUpIHtcbiAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWl0IEhhc2ggICAgIE9yaWdpbmFsIExpbmUgTnVtYmVyICAgICAgICAgICAgICAgRGF0ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGltZXpvbmUgT2Zmc2V0ICAgICAgICAgICAgICAgTGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXiAgICAgRmlsZSBQYXRoICAgIF4gICAgICAgQXV0aG9yICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgVGltZSAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgTGluZSBOdW1iZXIgICBeXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgXiAgICAgICAgfCAgICAgICAgICBeICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgIF4gICAgICAgIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICB8ICAgICAgICB8ICAgICAgICAgIHwgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgfCAgICAgICAgfFxuICAgICAgICAgICAgICAgICAgICAgICAgIHwtLS0tLS0tLS18ICB8LS0tfCAgIHwtLS0tLS18ICAgIHwtLXwgICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18ICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18ICB8LS0tLS0tLS0tLS0tfCAgIHwtLS0tLS0tLXx8LS0tLXwgICovXG4gICAgY29uc3QgYmxhbWVSZWdleCA9IC9eKFthLXowLTldKylcXHMoXFxTKylcXHMrKFswLTldKylcXHNcXCgoLispXFxzKyhbMC05XXs0fS1bMC05XXsyfS1bMC05XXsyfSlcXHMoWzAtOV17Mn06WzAtOV17Mn06WzAtOV17Mn0pXFxzKFsrLV1bMC05XXs0fSlcXHMrKFswLTldKylcXCkoLit8JCkvO1xuICAgIGNvbnN0IG1hdGNoZWQgPSBibGFtZUxpbmUubWF0Y2goYmxhbWVSZWdleCk7XG4gICAgaWYgKCFtYXRjaGVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhibGFtZUxpbmUpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgcGFyc2UgYmxhbWUgbGluZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbW1pdEhhc2g6IG1hdGNoZWRbMV0udHJpbSgpLFxuICAgICAgZmlsZVBhdGg6IG1hdGNoZWRbMl0udHJpbSgpLFxuICAgICAgb3JpZ2luYWxMaW5lTnVtYmVyOiBtYXRjaGVkWzNdLnRyaW0oKSxcbiAgICAgIGxpbmVOdW1iZXI6IG1hdGNoZWRbOF0udHJpbSgpLFxuICAgICAgYXV0aG9yOiBtYXRjaGVkWzRdLnRyaW0oKSxcbiAgICAgIGNvbW1pdGVkQXQ6IG5ldyBEYXRlKGAke21hdGNoZWRbNV0udHJpbSgpfSAke21hdGNoZWRbNl0udHJpbSgpfSAke21hdGNoZWRbN10udHJpbSgpfWApLFxuICAgICAgbGluZTogbWF0Y2hlZFs5XSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdpdEhlbHBlcjtcbiJdfQ==