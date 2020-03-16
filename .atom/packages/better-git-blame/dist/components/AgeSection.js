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
class AgeSection extends React.PureComponent {
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
        return (React.createElement("div", { className: "age-graph" },
            React.createElement("div", { className: "markers tight" },
                React.createElement("div", { className: "start" },
                    React.createElement("div", { className: "start-inner" },
                        React.createElement("h1", { title: moment(this.props.firstCommitDate).format(ConfigManager.get('gutterDateFormat')) }, "Repo Created"))),
                React.createElement("div", { className: "end" },
                    React.createElement("div", { className: "end-inner" },
                        React.createElement("h1", null, "Today")))),
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
                    React.createElement("code", null, moment(this.props.commit.commitedAt).format(ConfigManager.get('gutterDateFormat')))))));
    }
}
export default AgeSection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlU2VjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL0FnZVNlY3Rpb24udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7Ozs7O0FBRVosT0FBTyxLQUFLLE1BQU0sZUFBZSxDQUFDO0FBQ2xDLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssYUFBYSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sS0FBSyxVQUFVLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxLQUFLLFNBQVMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEtBQUssdUJBQXVCLE1BQU0sc0NBQXNDLENBQUM7QUFZaEYsZ0JBQWlCLFNBQVEsS0FBSyxDQUFDLGFBQWlEO0lBTTlFLFlBQVksR0FBRyxLQUFZO1FBQ3pCLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDbkIsQ0FBQTtRQUNELFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbEQsdUJBQXVCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUssa0JBQWtCOztZQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNsRyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNuRSxNQUFNLFFBQVEsR0FBRyxNQUFNLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7WUFDbkYsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDWixRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUM5QixDQUFDLENBQUM7YUFDSCxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCxNQUFNO1FBQ0osSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksY0FBYyxHQUFHLGtDQUFrQyxDQUFDO1FBQ3hELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQixjQUFjLEdBQUcsa0JBQWtCLENBQUM7WUFDcEMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUN0QixDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNCLGNBQWMsR0FBRyxtQ0FBbUMsQ0FBQztZQUNyRCxVQUFVLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLENBQ0wsNkJBQUssU0FBUyxFQUFDLFdBQVc7WUFDeEIsNkJBQUssU0FBUyxFQUFDLGVBQWU7Z0JBQzVCLDZCQUFLLFNBQVMsRUFBQyxPQUFPO29CQUNwQiw2QkFBSyxTQUFTLEVBQUMsYUFBYTt3QkFDMUIsNEJBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsbUJBRXRGLENBQ0QsQ0FDRjtnQkFDTiw2QkFBSyxTQUFTLEVBQUMsS0FBSztvQkFDbEIsNkJBQUssU0FBUyxFQUFDLFdBQVc7d0JBQ3hCLHdDQUFjLENBQ1YsQ0FDRixDQUNGO1lBQ04sNkJBQUssU0FBUyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUU7b0JBQzNCLFVBQVUsRUFBRSwwQkFBMEIsUUFBUSxHQUFHO2lCQUNsRDtnQkFDQyw2QkFBSyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBRTt3QkFDM0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRztxQkFDL0IsR0FBSSxDQUNEO1lBQ04sNkJBQUssU0FBUyxFQUFDLFNBQVM7Z0JBQ3RCLDZCQUFLLFNBQVMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFFO3dCQUM1QixVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHO3dCQUNwQyxTQUFTLEVBQUUsVUFBVTt3QkFDckIsU0FBUyxFQUFFLGNBQWM7cUJBQzFCO29CQUNDLDJCQUFHLFNBQVMsRUFBQyxzQkFBc0IsR0FBRztvQkFDdEMsK0JBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFLO29CQUN2RCxrQ0FDRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUM5RSxDQUNILENBQ0YsQ0FDRixDQUNQLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxlQUFlLFVBQVUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncHJlYWN0LWNvbXBhdCc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgKiBhcyBDb25maWdNYW5hZ2VyIGZyb20gJy4uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0ICogYXMgQ29sb3JTY2FsZSBmcm9tICcuLi9pbnRlcmZhY2UvQ29sb3VyU2NhbGUnO1xuaW1wb3J0ICogYXMgQW5hbHl0aWNzIGZyb20gJy4uL3N0ZXBzaXplL0FuYWx5dGljcyc7XG5pbXBvcnQgKiBhcyBJbnRlZ3JhdGlvbk5vdGlmaWNhdGlvbiBmcm9tICcuLi9pbnRlcmZhY2UvSW50ZWdyYXRpb25Ob3RpZmljYXRpb24nO1xuXG5pbnRlcmZhY2UgSUFnZVNlY3Rpb25Qcm9wcyB7XG4gIGZpcnN0Q29tbWl0RGF0ZTogRGF0ZVxuICBjb21taXREYXk6IG51bWJlclxuICBjb21taXQ6IGFueVxufVxuXG5pbnRlcmZhY2UgSUFnZVNlY3Rpb25TdGF0ZSB7XG4gIGdyYWRpZW50OiBBcnJheTxzdHJpbmc+O1xufVxuXG5jbGFzcyBBZ2VTZWN0aW9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxJQWdlU2VjdGlvblByb3BzLCBJQWdlU2VjdGlvblN0YXRlPiB7XG5cbiAgdG90YWxEYXlzOiBudW1iZXI7XG4gIHBvaW50UG9zaXRpb246IG51bWJlcjtcbiAgc3RhdGU6IGFueTtcblxuICBjb25zdHJ1Y3RvciguLi5wcm9wczogYW55W10pe1xuICAgIHN1cGVyKC4uLnByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZ3JhZGllbnQ6IFsnIzAwMCddXG4gICAgfVxuICAgIEFuYWx5dGljcy50cmFjaygnVG9vbHRpcCBzaG93bicsIHsgdHlwZTogJ2FnZScgfSk7XG4gICAgSW50ZWdyYXRpb25Ob3RpZmljYXRpb24udHJhY2tUb29sdGlwU2hvd24oKTtcbiAgfVxuXG4gIGFzeW5jIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLnRvdGFsRGF5cyA9IChEYXRlLm5vdygpIC0gbmV3IERhdGUodGhpcy5wcm9wcy5maXJzdENvbW1pdERhdGUpLmdldFRpbWUoKSkgLyAxMDAwIC8gMzYwMCAvIDI0O1xuICAgIHRoaXMucG9pbnRQb3NpdGlvbiA9ICh0aGlzLnByb3BzLmNvbW1pdERheSAvIHRoaXMudG90YWxEYXlzKSAqIDEwMDtcbiAgICBjb25zdCBncmFkaWVudCA9IGF3YWl0IENvbG9yU2NhbGUuY29sb3JTY2FsZShhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCkpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZ3JhZGllbnQ6IGdyYWRpZW50Lm1hcCgoY29sb3IpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbG9yLmhzbCgpLnN0cmluZygpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcG9pbnRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGxldCBwb2ludFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVgoMXB4KSc7XG4gICAgaWYodGhpcy5wb2ludFBvc2l0aW9uIDwgMjApIHtcbiAgICAgIHBvaW50VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLTVweCknO1xuICAgICAgcG9pbnRBbGlnbiA9ICdsZWZ0JztcbiAgICB9XG4gICAgaWYodGhpcy5wb2ludFBvc2l0aW9uID4gNzApIHtcbiAgICAgIHBvaW50VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLTEwMCUpIHRyYW5zbGF0ZVgoOHB4KSc7XG4gICAgICBwb2ludEFsaWduID0gJ3JpZ2h0JztcbiAgICB9XG4gICAgY29uc3QgZ3JhZGllbnQgPSB0aGlzLnN0YXRlLmdyYWRpZW50LmpvaW4oJywnKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZ2UtZ3JhcGhcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXJrZXJzIHRpZ2h0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGFydFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGFydC1pbm5lclwiPlxuICAgICAgICAgICAgICA8aDEgdGl0bGU9e21vbWVudCh0aGlzLnByb3BzLmZpcnN0Q29tbWl0RGF0ZSkuZm9ybWF0KENvbmZpZ01hbmFnZXIuZ2V0KCdndXR0ZXJEYXRlRm9ybWF0JykpfT5cbiAgICAgICAgICAgICAgICBSZXBvIENyZWF0ZWRcbiAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW5kXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVuZC1pbm5lclwiPlxuICAgICAgICAgICAgICA8aDE+VG9kYXk8L2gxPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJhaWxcIiBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICR7Z3JhZGllbnR9KWBcbiAgICAgICAgfX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aWNrXCIgc3R5bGU9e3tcbiAgICAgICAgICAgIGxlZnQ6IGAke3RoaXMucG9pbnRQb3NpdGlvbn0lYCxcbiAgICAgICAgICB9fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXJrZXJzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb2ludFwiIHN0eWxlPXt7XG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiBgJHt0aGlzLnBvaW50UG9zaXRpb259JWAsXG4gICAgICAgICAgICB0ZXh0QWxpZ246IHBvaW50QWxpZ24sXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHBvaW50VHJhbnNmb3JtLFxuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvbiBpY29uLWdpdC1jb21taXRcIiAvPlxuICAgICAgICAgICAgPHA+e21vbWVudCh0aGlzLnByb3BzLmNvbW1pdC5jb21taXRlZEF0KS5mcm9tTm93KCl9PC9wPlxuICAgICAgICAgICAgPGNvZGU+XG4gICAgICAgICAgICAgIHttb21lbnQodGhpcy5wcm9wcy5jb21taXQuY29tbWl0ZWRBdCkuZm9ybWF0KENvbmZpZ01hbmFnZXIuZ2V0KCdndXR0ZXJEYXRlRm9ybWF0JykpfVxuICAgICAgICAgICAgPC9jb2RlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBZ2VTZWN0aW9uXG4iXX0=