'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SelectionWatcher from './stepsize/SelectionWatcher';
import StepsizeOutgoing from './stepsize/StepsizeOutgoing';
import StepsizeHelper from './stepsize/StepsizeHelper';
import { CompositeDisposable } from 'atom';
import GutterView from './interface/GutterView';
import os from 'os';
import * as ConfigManager from './ConfigManager';
import * as ColorScale from './interface/ColourScale';
import * as Analytics from './stepsize/Analytics';
let disposables = new CompositeDisposable();
let outgoing;
let gutters = new Map();
export const config = ConfigManager.getConfig();
export function activate(state) {
    disposables.add(atom.commands.add('atom-workspace', {
        'better-git-blame:toggle': () => toggleGutterView(),
    }));
    if (os.platform() === 'darwin') {
        enableLayerSearch();
    }
    else {
        ConfigManager.set('searchInLayerEnabled', false);
    }
    Analytics.init();
}
function layerEditorObserver(editor) {
    return __awaiter(this, void 0, void 0, function* () {
        let watcher = new SelectionWatcher(editor);
        watcher.onSelection(function () {
            const event = outgoing.buildSelectionEvent(editor);
            outgoing.send(event);
        });
    });
}
function enableLayerSearch() {
    StepsizeHelper.checkLayerInstallation()
        .then(() => {
        ConfigManager.set('searchInLayerEnabled', true);
        outgoing = new StepsizeOutgoing();
        atom.workspace.observeTextEditors(layerEditorObserver);
    })
        .catch(e => {
        ConfigManager.set('searchInLayerEnabled', false);
    });
}
function toggleGutterView() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
        const gutter = gutters.get(editor);
        if (gutter) {
            gutter.toggle();
        }
        else {
            gutters.set(editor, new GutterView(editor, outgoing));
            ColorScale.setEditor(editor);
        }
    }
}
export function deactivate() {
    disposables.dispose();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDOzs7Ozs7Ozs7QUFHWixPQUFPLGdCQUFnQixNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sZ0JBQWdCLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxjQUFjLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQztBQUNwQixPQUFPLEtBQUssYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sS0FBSyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxLQUFLLFNBQVMsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxJQUFJLFdBQVcsR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7QUFDNUMsSUFBSSxRQUEwQixDQUFDO0FBQy9CLElBQUksT0FBTyxHQUE2QixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRWxELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7QUFFaEQsTUFBTSxtQkFBbUIsS0FBSztJQUM1QixXQUFXLENBQUMsR0FBRyxDQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1FBQ2xDLHlCQUF5QixFQUFFLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixFQUFFO0tBQ3BELENBQUMsQ0FDSCxDQUFDO0lBQ0YsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDL0IsaUJBQWlCLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixhQUFhLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDRCxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbkIsQ0FBQztBQUVELDZCQUFtQyxNQUFlOztRQUNoRCxJQUFJLE9BQU8sR0FBRyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDbEIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQUE7QUFFRDtJQUNFLGNBQWMsQ0FBQyxzQkFBc0IsRUFBRTtTQUNwQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1QsYUFBYSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRCxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDVCxhQUFhLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVEO0lBQ0UsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ3BELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFFRCxNQUFNO0lBQ0osV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IElFZGl0b3IgPSBBdG9tQ29yZS5JRWRpdG9yO1xuaW1wb3J0IFNlbGVjdGlvbldhdGNoZXIgZnJvbSAnLi9zdGVwc2l6ZS9TZWxlY3Rpb25XYXRjaGVyJztcbmltcG9ydCBTdGVwc2l6ZU91dGdvaW5nIGZyb20gJy4vc3RlcHNpemUvU3RlcHNpemVPdXRnb2luZyc7XG5pbXBvcnQgU3RlcHNpemVIZWxwZXIgZnJvbSAnLi9zdGVwc2l6ZS9TdGVwc2l6ZUhlbHBlcic7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgR3V0dGVyVmlldyBmcm9tICcuL2ludGVyZmFjZS9HdXR0ZXJWaWV3JztcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgKiBhcyBDb25maWdNYW5hZ2VyIGZyb20gJy4vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQgKiBhcyBDb2xvclNjYWxlIGZyb20gJy4vaW50ZXJmYWNlL0NvbG91clNjYWxlJztcbmltcG9ydCAqIGFzIEFuYWx5dGljcyBmcm9tICcuL3N0ZXBzaXplL0FuYWx5dGljcyc7XG5cbmxldCBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG5sZXQgb3V0Z29pbmc6IFN0ZXBzaXplT3V0Z29pbmc7XG5sZXQgZ3V0dGVyczogTWFwPElFZGl0b3IsIEd1dHRlclZpZXc+ID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0gQ29uZmlnTWFuYWdlci5nZXRDb25maWcoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlKHN0YXRlKSB7XG4gIGRpc3Bvc2FibGVzLmFkZChcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAnYmV0dGVyLWdpdC1ibGFtZTp0b2dnbGUnOiAoKSA9PiB0b2dnbGVHdXR0ZXJWaWV3KCksXG4gICAgfSlcbiAgKTtcbiAgaWYgKG9zLnBsYXRmb3JtKCkgPT09ICdkYXJ3aW4nKSB7XG4gICAgZW5hYmxlTGF5ZXJTZWFyY2goKTtcbiAgfSBlbHNlIHtcbiAgICBDb25maWdNYW5hZ2VyLnNldCgnc2VhcmNoSW5MYXllckVuYWJsZWQnLCBmYWxzZSk7XG4gIH1cbiAgQW5hbHl0aWNzLmluaXQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbGF5ZXJFZGl0b3JPYnNlcnZlcihlZGl0b3I6IElFZGl0b3IpIHtcbiAgbGV0IHdhdGNoZXIgPSBuZXcgU2VsZWN0aW9uV2F0Y2hlcihlZGl0b3IpO1xuICB3YXRjaGVyLm9uU2VsZWN0aW9uKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGV2ZW50ID0gb3V0Z29pbmcuYnVpbGRTZWxlY3Rpb25FdmVudChlZGl0b3IpO1xuICAgIG91dGdvaW5nLnNlbmQoZXZlbnQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlTGF5ZXJTZWFyY2goKSB7XG4gIFN0ZXBzaXplSGVscGVyLmNoZWNrTGF5ZXJJbnN0YWxsYXRpb24oKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIENvbmZpZ01hbmFnZXIuc2V0KCdzZWFyY2hJbkxheWVyRW5hYmxlZCcsIHRydWUpO1xuICAgICAgb3V0Z29pbmcgPSBuZXcgU3RlcHNpemVPdXRnb2luZygpO1xuICAgICAgYXRvbS53b3Jrc3BhY2Uub2JzZXJ2ZVRleHRFZGl0b3JzKGxheWVyRWRpdG9yT2JzZXJ2ZXIpO1xuICAgIH0pXG4gICAgLmNhdGNoKGUgPT4ge1xuICAgICAgQ29uZmlnTWFuYWdlci5zZXQoJ3NlYXJjaEluTGF5ZXJFbmFibGVkJywgZmFsc2UpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVHdXR0ZXJWaWV3KCkge1xuICBjb25zdCBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCk7XG4gIGlmIChlZGl0b3IpIHtcbiAgICBjb25zdCBndXR0ZXIgPSBndXR0ZXJzLmdldChlZGl0b3IpO1xuICAgIGlmIChndXR0ZXIpIHtcbiAgICAgIGd1dHRlci50b2dnbGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3V0dGVycy5zZXQoZWRpdG9yLCBuZXcgR3V0dGVyVmlldyhlZGl0b3IsIG91dGdvaW5nKSk7XG4gICAgICBDb2xvclNjYWxlLnNldEVkaXRvcihlZGl0b3IpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xufVxuIl19