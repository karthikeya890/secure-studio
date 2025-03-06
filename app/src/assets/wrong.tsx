
const WrongIcon = (h?: string, w?: string, color?: string) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w || "48"} height={h || "48"} viewBox="0 -960 960 960" fill={color || "#000000"}><path d="m249-186-63-63 231-231-231-230 63-64 231 230 231-230 63 64-230 230 230 231-63 63-231-230-231 230Z" /></svg>
    )
}

export default WrongIcon