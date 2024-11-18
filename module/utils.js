export default class UAUtils
{
    static get theme() {
        switch (game.settings.get("unknownarmies", "Sheet&UITheme")) {
            case 1:
                return "theme--blue";
            case 2:
                return "theme--green";
            case 3:
                return "theme--grey";
            case 4:
                return "theme--purple";
            case 5:
                return "theme--red";
            default:
                return "";
        }
    }
}