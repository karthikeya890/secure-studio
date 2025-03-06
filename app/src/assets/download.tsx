
const Download = (h?: string, w?: string, color?: string) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={h || "48px"} viewBox="0 -960 960 960" width={w || "48px"} fill={color || "#1f1f1f"}><path d="M481-323 256-547l66-65 113 114v-324h91v324l113-114 66 65-224 224ZM230-139q-37.18 0-64.09-26.91Q139-192.82 139-230v-143h91v143h500v-143h92v143q0 37-27.21 64-27.2 27-64.79 27H230Z" /></svg>
    )
}
export default Download