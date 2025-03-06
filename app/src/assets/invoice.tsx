
const Invoice = (h?: string, w?: string, color?: string) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={h || "48px"} viewBox="0 -960 960 960" width={w || "48px"} fill={color || "#1f1f1f"}><path d="M321-250h318v-69H321v69Zm0-169h319v-68H321v68ZM229-59q-35.78 0-63.39-26.91Q138-112.83 138-150v-660q0-37.59 27.61-64.79Q193.22-902 229-902h364l230 228v524q0 37.17-27.91 64.09Q767.19-59 731-59H229Zm316-569v-182H229v660h502v-478H545ZM229-810v182-182 660-660Z" /></svg>)
}

export default Invoice