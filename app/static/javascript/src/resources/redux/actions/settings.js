import {SETTINGS_CHANGE} from "../types/settings";

const handleSettingsChange = (name, value) => ({
    type: SETTINGS_CHANGE,
    payload: {
        [name]: value,
    }
});

export {
    handleSettingsChange
}