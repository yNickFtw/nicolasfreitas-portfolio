export function isValidJSONFormat(JsonArray: string | any[], isJson: boolean): boolean {
    try {
        let data = JsonArray

        if (isJson && typeof JsonArray === "string") {
            data = JSON.parse(JsonArray);
        }

        if(data.length < 1) {
            return false
        }

        if (!Array.isArray(data)) return false

        for (const item of data) {
            if (
                !(
                    typeof item === "object" &&
                    "name" in item &&
                    "icon" in item &&
                    "slug" in item &&
                    typeof item.name === "string" &&
                    typeof item.icon === "string" &&
                    typeof item.slug === "string"
                )
            ) {
                return false;
            }
        }

        return true
    } catch (error) {
        console.log(error);
        return false
    }
}