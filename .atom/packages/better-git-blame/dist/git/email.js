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
function email() {
    return __awaiter(this, void 0, void 0, function* () {
        let gitEmail;
        try {
            gitEmail = (yield runGitCommand('/', `config --global user.email`));
        }
        catch (e) {
            throw e;
        }
        if (gitEmail.length > 0) {
            return gitEmail.trim();
        }
        throw new Error('Git config did not return an email');
    });
}
export default email;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZ2l0L2VtYWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7Ozs7O0FBRVosT0FBTyxhQUFhLE1BQU0sY0FBYyxDQUFDO0FBRXpDOztRQUNFLElBQUksUUFBZ0IsQ0FBQztRQUNyQixJQUFJLENBQUM7WUFDSCxRQUFRLEdBQUcsQ0FBQyxNQUFNLGFBQWEsQ0FBQyxHQUFHLEVBQUUsNEJBQTRCLENBQUMsQ0FBVyxDQUFDO1FBQ2hGLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLENBQUM7UUFDVixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQUE7QUFFRCxlQUFlLEtBQUssQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5pbXBvcnQgcnVuR2l0Q29tbWFuZCBmcm9tICcuL3J1bkNvbW1hbmQnO1xuXG5hc3luYyBmdW5jdGlvbiBlbWFpbCgpIHtcbiAgbGV0IGdpdEVtYWlsOiBzdHJpbmc7XG4gIHRyeSB7XG4gICAgZ2l0RW1haWwgPSAoYXdhaXQgcnVuR2l0Q29tbWFuZCgnLycsIGBjb25maWcgLS1nbG9iYWwgdXNlci5lbWFpbGApKSBhcyBzdHJpbmc7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBlO1xuICB9XG4gIGlmIChnaXRFbWFpbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGdpdEVtYWlsLnRyaW0oKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ0dpdCBjb25maWcgZGlkIG5vdCByZXR1cm4gYW4gZW1haWwnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZW1haWw7XG4iXX0=