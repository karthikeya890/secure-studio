const CallIcon = (h?: string, w?: string, color?: string) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w || "48px"} height={h || "48px"} viewBox="0 -960 960 960" fill={color || "#000000"}><path d="M793-99q-121 0-244.5-58T321-319Q216-423 157.5-548T99-792q0-29 20-49.5t49-20.5h135q31 0 51 16.5t26 47.5l27 106q2 26-3.5 47T383-611l-102 94q20 36 46.5 68.5T385-387q33 36 67 61.5t69 44.5l99-99q16-18 37.5-24.5t46.5-.5l95 22q30 9 46.5 29t16.5 50v136q0 29-20.5 49T793-99Z" /></svg>
    )
}
export default CallIcon