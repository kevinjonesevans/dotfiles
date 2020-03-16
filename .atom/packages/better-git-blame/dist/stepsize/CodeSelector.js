'use babel';
import _ from 'lodash';
class CodeSelector {
    constructor(editor) {
        this.codeFolds = [];
        this.editor = editor;
        this.calculateCodeFolds();
    }
    calculateCodeFolds() {
        this.getFoldStarts();
        this.getFoldEnds();
    }
    getFoldStarts() {
        for (let i = 0; i < this.editor.getLineCount(); i++) {
            if (this.editor.isFoldableAtBufferRow(i)) {
                let codeFold = {
                    start: i,
                    indentation: this.editor.indentationForBufferRow(i),
                };
                this.codeFolds.push(codeFold);
            }
        }
    }
    getFoldEnds() {
        for (let i in this.codeFolds) {
            const codeFold = this.codeFolds[i];
            const startIndent = codeFold.indentation;
            let foldEnd = parseInt(codeFold.start);
            let indentation = this.safeIndentationForRow(++foldEnd);
            let skipLine = false;
            while ((indentation !== undefined && indentation > startIndent) || skipLine) {
                const nextLineText = this.editor.lineTextForBufferRow(foldEnd + 1);
                if (nextLineText) {
                    skipLine = nextLineText.match(/^\s+$/) || nextLineText.length === 0;
                }
                indentation = this.safeIndentationForRow(++foldEnd);
            }
            codeFold.end = foldEnd;
            codeFold.marker = this.editor.markBufferRange([[codeFold.start, 0], [foldEnd, 9001]]);
        }
    }
    // editor.indentationForBufferRow throws when the row number is too large. From what I can tell this
    // shouldn't happen given how this.codeFolds is built by getFoldStarts, but apparently it does (see #30)
    safeIndentationForRow(row) {
        let indentation;
        try {
            indentation = this.editor.indentationForBufferRow(row);
        }
        catch (error) { }
        return indentation;
    }
    getFoldForRange(range) {
        const startRow = range.start.row;
        const endRow = range.end.row;
        // Start checking for folds near the middle of the range
        let checkRow = endRow - Math.ceil((endRow - startRow) / 2);
        // Store the current search results end row and fold for comparison and return;
        let foldEnd = endRow;
        let fold;
        // Store a fold to use if we cant find the exact one we want
        let fallbackFold;
        do {
            if (this.editor.isFoldableAtBufferRow(checkRow)) {
                fold = _.find(this.codeFolds, { start: checkRow });
                if (fold) {
                    if (!fallbackFold || checkRow >= startRow) {
                        fallbackFold = fold;
                    }
                    foldEnd = fold.end;
                }
            }
            checkRow--;
        } while (foldEnd <= endRow && checkRow > 0);
        if (foldEnd > endRow) {
            return fold;
        }
        else {
            return fallbackFold;
        }
    }
}
export default CodeSelector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZVNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3N0ZXBzaXplL0NvZGVTZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7QUFJWixPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFdkI7SUFJRSxZQUFZLE1BQWU7UUFGbkIsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUdqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLGFBQWE7UUFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksUUFBUSxHQUFHO29CQUNiLEtBQUssRUFBRSxDQUFDO29CQUNSLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztpQkFDcEQsQ0FBQztnQkFDRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTyxXQUFXO1FBQ2pCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxD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QyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IElSYW5nZSA9IFRleHRCdWZmZXIuSVJhbmdlO1xuaW1wb3J0IElFZGl0b3IgPSBBdG9tQ29yZS5JRWRpdG9yO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuY2xhc3MgQ29kZVNlbGVjdG9yIHtcbiAgcHJpdmF0ZSBlZGl0b3I6IElFZGl0b3I7XG4gIHByaXZhdGUgY29kZUZvbGRzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgY29uc3RydWN0b3IoZWRpdG9yOiBJRWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3I7XG4gICAgdGhpcy5jYWxjdWxhdGVDb2RlRm9sZHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlQ29kZUZvbGRzKCkge1xuICAgIHRoaXMuZ2V0Rm9sZFN0YXJ0cygpO1xuICAgIHRoaXMuZ2V0Rm9sZEVuZHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Rm9sZFN0YXJ0cygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZWRpdG9yLmdldExpbmVDb3VudCgpOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmVkaXRvci5pc0ZvbGRhYmxlQXRCdWZmZXJSb3coaSkpIHtcbiAgICAgICAgbGV0IGNvZGVGb2xkID0ge1xuICAgICAgICAgIHN0YXJ0OiBpLFxuICAgICAgICAgIGluZGVudGF0aW9uOiB0aGlzLmVkaXRvci5pbmRlbnRhdGlvbkZvckJ1ZmZlclJvdyhpKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb2RlRm9sZHMucHVzaChjb2RlRm9sZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGb2xkRW5kcygpIHtcbiAgICBmb3IgKGxldCBpIGluIHRoaXMuY29kZUZvbGRzKSB7XG4gICAgICBjb25zdCBjb2RlRm9sZCA9IHRoaXMuY29kZUZvbGRzW2ldO1xuICAgICAgY29uc3Qgc3RhcnRJbmRlbnQgPSBjb2RlRm9sZC5pbmRlbnRhdGlvbjtcbiAgICAgIGxldCBmb2xkRW5kID0gcGFyc2VJbnQoY29kZUZvbGQuc3RhcnQpO1xuICAgICAgbGV0IGluZGVudGF0aW9uID0gdGhpcy5zYWZlSW5kZW50YXRpb25Gb3JSb3coKytmb2xkRW5kKTtcbiAgICAgIGxldCBza2lwTGluZSA9IGZhbHNlO1xuICAgICAgd2hpbGUgKChpbmRlbnRhdGlvbiAhPT0gdW5kZWZpbmVkICYmIGluZGVudGF0aW9uID4gc3RhcnRJbmRlbnQpIHx8IHNraXBMaW5lKSB7XG4gICAgICAgIGNvbnN0IG5leHRMaW5lVGV4dCA9IHRoaXMuZWRpdG9yLmxpbmVUZXh0Rm9yQnVmZmVyUm93KGZvbGRFbmQgKyAxKTtcbiAgICAgICAgaWYgKG5leHRMaW5lVGV4dCkge1xuICAgICAgICAgIHNraXBMaW5lID0gbmV4dExpbmVUZXh0Lm1hdGNoKC9eXFxzKyQvKSB8fCBuZXh0TGluZVRleHQubGVuZ3RoID09PSAwO1xuICAgICAgICB9XG4gICAgICAgIGluZGVudGF0aW9uID0gdGhpcy5zYWZlSW5kZW50YXRpb25Gb3JSb3coKytmb2xkRW5kKTtcbiAgICAgIH1cbiAgICAgIGNvZGVGb2xkLmVuZCA9IGZvbGRFbmQ7XG4gICAgICBjb2RlRm9sZC5tYXJrZXIgPSB0aGlzLmVkaXRvci5tYXJrQnVmZmVyUmFuZ2UoW1tjb2RlRm9sZC5zdGFydCwgMF0sIFtmb2xkRW5kLCA5MDAxXV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVkaXRvci5pbmRlbnRhdGlvbkZvckJ1ZmZlclJvdyB0aHJvd3Mgd2hlbiB0aGUgcm93IG51bWJlciBpcyB0b28gbGFyZ2UuIEZyb20gd2hhdCBJIGNhbiB0ZWxsIHRoaXNcbiAgLy8gc2hvdWxkbid0IGhhcHBlbiBnaXZlbiBob3cgdGhpcy5jb2RlRm9sZHMgaXMgYnVpbHQgYnkgZ2V0Rm9sZFN0YXJ0cywgYnV0IGFwcGFyZW50bHkgaXQgZG9lcyAoc2VlICMzMClcbiAgcHJpdmF0ZSBzYWZlSW5kZW50YXRpb25Gb3JSb3cocm93OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCBpbmRlbnRhdGlvbjtcbiAgICB0cnkge1xuICAgICAgaW5kZW50YXRpb24gPSB0aGlzLmVkaXRvci5pbmRlbnRhdGlvbkZvckJ1ZmZlclJvdyhyb3cpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgIHJldHVybiBpbmRlbnRhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGb2xkRm9yUmFuZ2UocmFuZ2U6IElSYW5nZSkge1xuICAgIGNvbnN0IHN0YXJ0Um93ID0gcmFuZ2Uuc3RhcnQucm93O1xuICAgIGNvbnN0IGVuZFJvdyA9IHJhbmdlLmVuZC5yb3c7XG4gICAgLy8gU3RhcnQgY2hlY2tpbmcgZm9yIGZvbGRzIG5lYXIgdGhlIG1pZGRsZSBvZiB0aGUgcmFuZ2VcbiAgICBsZXQgY2hlY2tSb3cgPSBlbmRSb3cgLSBNYXRoLmNlaWwoKGVuZFJvdyAtIHN0YXJ0Um93KSAvIDIpO1xuICAgIC8vIFN0b3JlIHRoZSBjdXJyZW50IHNlYXJjaCByZXN1bHRzIGVuZCByb3cgYW5kIGZvbGQgZm9yIGNvbXBhcmlzb24gYW5kIHJldHVybjtcbiAgICBsZXQgZm9sZEVuZCA9IGVuZFJvdztcbiAgICBsZXQgZm9sZDtcbiAgICAvLyBTdG9yZSBhIGZvbGQgdG8gdXNlIGlmIHdlIGNhbnQgZmluZCB0aGUgZXhhY3Qgb25lIHdlIHdhbnRcbiAgICBsZXQgZmFsbGJhY2tGb2xkO1xuICAgIGRvIHtcbiAgICAgIGlmICh0aGlzLmVkaXRvci5pc0ZvbGRhYmxlQXRCdWZmZXJSb3coY2hlY2tSb3cpKSB7XG4gICAgICAgIGZvbGQgPSBfLmZpbmQodGhpcy5jb2RlRm9sZHMsIHsgc3RhcnQ6IGNoZWNrUm93IH0pO1xuICAgICAgICBpZiAoZm9sZCkge1xuICAgICAgICAgIGlmICghZmFsbGJhY2tGb2xkIHx8IGNoZWNrUm93ID49IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICBmYWxsYmFja0ZvbGQgPSBmb2xkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb2xkRW5kID0gZm9sZC5lbmQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNoZWNrUm93LS07XG4gICAgfSB3aGlsZSAoZm9sZEVuZCA8PSBlbmRSb3cgJiYgY2hlY2tSb3cgPiAwKTtcbiAgICBpZiAoZm9sZEVuZCA+IGVuZFJvdykge1xuICAgICAgcmV0dXJuIGZvbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxsYmFja0ZvbGQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvZGVTZWxlY3RvcjtcbiJdfQ==