const MailIcon = (h?: string, w?: string, color?: string) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w || "48px"} height={h || "48px"} viewBox="0 -960 960 960" fill={color || "#000000"}><path d="M150-138q-36.78 0-63.89-27.61T59-229v-502q0-36.19 27.11-64.09Q113.22-823 150-823h660q37.19 0 64.59 27.91Q902-767.19 902-731v502q0 35.78-27.41 63.39Q847.19-138 810-138H150Zm330-295 330-223v-75L480-513 150-731v75l330 223Z" /></svg>)
}
export default MailIcon
