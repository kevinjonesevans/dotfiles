'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'preact-compat';
import moment from 'moment';
import * as ConfigManager from '../ConfigManager';
import * as ColorScale from '../interface/ColourScale';
import * as Analytics from '../stepsize/Analytics';
import * as IntegrationNotification from '../interface/IntegrationNotification';
class AgeTooltip extends React.PureComponent {
    constructor(...props) {
        super(...props);
        this.state = {
            gradient: ['#000']
        };
        Analytics.track('Tooltip shown', { type: 'age' });
        IntegrationNotification.trackTooltipShown();
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.totalDays = (Date.now() - new Date(this.props.firstCommitDate).getTime()) / 1000 / 3600 / 24;
            this.pointPosition = (this.props.commitDay / this.totalDays) * 100;
            const gradient = yield ColorScale.colorScale(atom.workspace.getActiveTextEditor());
            this.setState({
                gradient: gradient.map((color) => {
                    return color.hsl().string();
                })
            });
        });
    }
    render() {
        let pointAlign = 'center';
        let pointTransform = 'translateX(-50%) translateX(1px)';
        if (this.pointPosition < 20) {
            pointTransform = 'translateX(-5px)';
            pointAlign = 'left';
        }
        if (this.pointPosition > 70) {
            pointTransform = 'translateX(-100%) translateX(8px)';
            pointAlign = 'right';
        }
        const gradient = this.state.gradient.join(',');
        return (React.createElement("div", { className: "layer-tooltip" },
            React.createElement("div", { className: "age-graph" },
                React.createElement("div", { className: "markers" },
                    React.createElement("div", { className: "start" },
                        React.createElement("div", { className: "start-inner" },
                            React.createElement("h3", { title: moment(this.props.firstCommitDate).format(ConfigManager.get('gutterDateFormat')) }, "Repo Created"))),
                    React.createElement("div", { className: "end" },
                        React.createElement("div", { className: "end-inner" },
                            React.createElement("h3", null, "Today")))),
                React.createElement("div", { className: "rail", style: {
                        background: `linear-gradient(90deg, ${gradient})`
                    } },
                    React.createElement("div", { className: "tick", style: {
                            left: `${this.pointPosition}%`,
                        } })),
                React.createElement("div", { className: "markers" },
                    React.createElement("div", { className: "point", style: {
                            marginLeft: `${this.pointPosition}%`,
                            textAlign: pointAlign,
                            transform: pointTransform,
                        } },
                        React.createElement("i", { className: "icon icon-git-commit" }),
                        React.createElement("p", null, moment(this.props.commit.commitedAt).fromNow()),
                        React.createElement("code", null, moment(this.props.commit.commitedAt).format(ConfigManager.get('gutterDateFormat'))))))));
    }
}
export default AgeTooltip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlVG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL0FnZVRvb2x0aXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7Ozs7O0FBRVosT0FBTyxLQUFLLE1BQU0sZUFBZSxDQUFDO0FBQ2xDLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssYUFBYSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sS0FBSyxVQUFVLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxLQUFLLFNBQVMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEtBQUssdUJBQXVCLE1BQU0sc0NBQXNDLENBQUM7QUFZaEYsZ0JBQWlCLFNBQVEsS0FBSyxDQUFDLGFBQWlEO0lBTTlFLFlBQVksR0FBRyxLQUFZO1FBQ3pCLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDbkIsQ0FBQTtRQUNELFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbEQsdUJBQXVCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUssa0JBQWtCOztZQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNsRyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNuRSxNQUFNLFFBQVEsR0FBRyxNQUFNLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7WUFDbkYsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDWixRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUs7b0JBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzlCLENBQUMsQ0FBQzthQUNILENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVELE1BQU07UUFDSixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxjQUFjLEdBQUcsa0NBQWtDLENBQUM7UUFDeEQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNCLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQztZQUNwQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsY0FBYyxHQUFHLG1DQUFtQyxDQUFDO1lBQ3JELFVBQVUsR0FBRyxPQUFPLENBQUM7UUFDdkIsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsQ0FDTCw2QkFBSyxTQUFTLEVBQUMsZUFBZTtZQUM1Qiw2QkFBSyxTQUFTLEVBQUMsV0FBVztnQkFDeEIsNkJBQUssU0FBUyxFQUFDLFNBQVM7b0JBQ3RCLDZCQUFLLFNBQVMsRUFBQyxPQUFPO3dCQUNwQiw2QkFBSyxTQUFTLEVBQUMsYUFBYTs0QkFDMUIsNEJBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsbUJBRXRGLENBQ0QsQ0FDRjtvQkFDTiw2QkFBSyxTQUFTLEVBQUMsS0FBSzt3QkFDbEIsNkJBQUssU0FBUyxFQUFDLFdBQVc7NEJBQ3hCLHdDQUFjLENBQ1YsQ0FDRixDQUNGO2dCQUNOLDZCQUFLLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFO3dCQUMzQixVQUFVLEVBQUUsMEJBQTBCLFFBQVEsR0FBRztxQkFDbEQ7b0JBQ0MsNkJBQUssU0FBUyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUU7NEJBQzNCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUc7eUJBQy9CLEdBQUksQ0FDRDtnQkFDTiw2QkFBSyxTQUFTLEVBQUMsU0FBUztvQkFDdEIsNkJBQUssU0FBUyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUU7NEJBQzVCLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUc7NEJBQ3BDLFNBQVMsRUFBRSxVQUFVOzRCQUNyQixTQUFTLEVBQUUsY0FBYzt5QkFDMUI7d0JBQ0MsMkJBQUcsU0FBUyxFQUFDLHNCQUFzQixHQUFHO3dCQUN0QywrQkFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUs7d0JBQ3ZELGtDQUNHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQzlFLENBQ0gsQ0FDRixDQUNGLENBQ0YsQ0FDUCxDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBRUQsZUFBZSxVQUFVLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3ByZWFjdC1jb21wYXQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgQ29uZmlnTWFuYWdlciBmcm9tICcuLi9Db25maWdNYW5hZ2VyJztcbmltcG9ydCAqIGFzIENvbG9yU2NhbGUgZnJvbSAnLi4vaW50ZXJmYWNlL0NvbG91clNjYWxlJztcbmltcG9ydCAqIGFzIEFuYWx5dGljcyBmcm9tICcuLi9zdGVwc2l6ZS9BbmFseXRpY3MnO1xuaW1wb3J0ICogYXMgSW50ZWdyYXRpb25Ob3RpZmljYXRpb24gZnJvbSAnLi4vaW50ZXJmYWNlL0ludGVncmF0aW9uTm90aWZpY2F0aW9uJztcblxuaW50ZXJmYWNlIElBZ2VUb29sdGlwUHJvcHMge1xuICBmaXJzdENvbW1pdERhdGU6IERhdGVcbiAgY29tbWl0RGF5OiBudW1iZXJcbiAgY29tbWl0OiBhbnlcbn1cblxuaW50ZXJmYWNlIElBZ2VUb29sdGlwU3RhdGUge1xuICBncmFkaWVudDogQXJyYXk8c3RyaW5nPjtcbn1cblxuY2xhc3MgQWdlVG9vbHRpcCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8SUFnZVRvb2x0aXBQcm9wcywgSUFnZVRvb2x0aXBTdGF0ZT4ge1xuXG4gIHRvdGFsRGF5czogbnVtYmVyO1xuICBwb2ludFBvc2l0aW9uOiBudW1iZXI7XG4gIHN0YXRlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoLi4ucHJvcHM6IGFueVtdKXtcbiAgICBzdXBlciguLi5wcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGdyYWRpZW50OiBbJyMwMDAnXVxuICAgIH1cbiAgICBBbmFseXRpY3MudHJhY2soJ1Rvb2x0aXAgc2hvd24nLCB7IHR5cGU6ICdhZ2UnIH0pO1xuICAgIEludGVncmF0aW9uTm90aWZpY2F0aW9uLnRyYWNrVG9vbHRpcFNob3duKCk7XG4gIH1cblxuICBhc3luYyBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy50b3RhbERheXMgPSAoRGF0ZS5ub3coKSAtIG5ldyBEYXRlKHRoaXMucHJvcHMuZmlyc3RDb21taXREYXRlKS5nZXRUaW1lKCkpIC8gMTAwMCAvIDM2MDAgLyAyNDtcbiAgICB0aGlzLnBvaW50UG9zaXRpb24gPSAodGhpcy5wcm9wcy5jb21taXREYXkgLyB0aGlzLnRvdGFsRGF5cykgKiAxMDA7XG4gICAgY29uc3QgZ3JhZGllbnQgPSBhd2FpdCBDb2xvclNjYWxlLmNvbG9yU2NhbGUoYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGdyYWRpZW50OiBncmFkaWVudC5tYXAoKGNvbG9yKSA9PiB7XG4gICAgICAgIHJldHVybiBjb2xvci5oc2woKS5zdHJpbmcoKTtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHBvaW50QWxpZ24gPSAnY2VudGVyJztcbiAgICBsZXQgcG9pbnRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVYKDFweCknO1xuICAgIGlmKHRoaXMucG9pbnRQb3NpdGlvbiA8IDIwKSB7XG4gICAgICBwb2ludFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC01cHgpJztcbiAgICAgIHBvaW50QWxpZ24gPSAnbGVmdCc7XG4gICAgfVxuICAgIGlmKHRoaXMucG9pbnRQb3NpdGlvbiA+IDcwKSB7XG4gICAgICBwb2ludFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0xMDAlKSB0cmFuc2xhdGVYKDhweCknO1xuICAgICAgcG9pbnRBbGlnbiA9ICdyaWdodCc7XG4gICAgfVxuICAgIGNvbnN0IGdyYWRpZW50ID0gdGhpcy5zdGF0ZS5ncmFkaWVudC5qb2luKCcsJyk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5ZXItdG9vbHRpcFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFnZS1ncmFwaFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFya2Vyc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGFydFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXJ0LWlubmVyXCI+XG4gICAgICAgICAgICAgICAgPGgzIHRpdGxlPXttb21lbnQodGhpcy5wcm9wcy5maXJzdENvbW1pdERhdGUpLmZvcm1hdChDb25maWdNYW5hZ2VyLmdldCgnZ3V0dGVyRGF0ZUZvcm1hdCcpKX0+XG4gICAgICAgICAgICAgICAgICBSZXBvIENyZWF0ZWRcbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbmRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbmQtaW5uZXJcIj5cbiAgICAgICAgICAgICAgICA8aDM+VG9kYXk8L2gzPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmFpbFwiIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAke2dyYWRpZW50fSlgXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpY2tcIiBzdHlsZT17e1xuICAgICAgICAgICAgICBsZWZ0OiBgJHt0aGlzLnBvaW50UG9zaXRpb259JWAsXG4gICAgICAgICAgICB9fSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFya2Vyc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb2ludFwiIHN0eWxlPXt7XG4gICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IGAke3RoaXMucG9pbnRQb3NpdGlvbn0lYCxcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiBwb2ludEFsaWduLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHBvaW50VHJhbnNmb3JtLFxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24gaWNvbi1naXQtY29tbWl0XCIgLz5cbiAgICAgICAgICAgICAgPHA+e21vbWVudCh0aGlzLnByb3BzLmNvbW1pdC5jb21taXRlZEF0KS5mcm9tTm93KCl9PC9wPlxuICAgICAgICAgICAgICA8Y29kZT5cbiAgICAgICAgICAgICAgICB7bW9tZW50KHRoaXMucHJvcHMuY29tbWl0LmNvbW1pdGVkQXQpLmZvcm1hdChDb25maWdNYW5hZ2VyLmdldCgnZ3V0dGVyRGF0ZUZvcm1hdCcpKX1cbiAgICAgICAgICAgICAgPC9jb2RlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFnZVRvb2x0aXBcbiJdfQ==