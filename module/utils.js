export default class UAUtils
{
    static get theme() {
        switch (game.settings.get("unknownarmies", "Sheet&UITheme")) {
            case 1:
                return "color-theme color-theme--blue";
            case 2:
                return "color-theme color-theme--green";
            case 3:
                return "color-theme color-theme--grey";
            case 4:
                return "color-theme color-theme--purple";
            case 5:
                return "color-theme color-theme--red";
            default:
                return "";
        }
    }
}