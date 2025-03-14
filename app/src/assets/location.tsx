const LocationIcon = (h?: string, w?: string, color?: string) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w || "48px"} height={h || "48px"} viewBox="0 -960 960 960" fill={color || "#000000"}><path d="M480.21-484q31.79 0 54.29-22.21t22.5-54q0-31.79-22.42-54.29t-54.5-22.5Q448-637 426-614.58t-22 54.5Q404-528 426.21-506t54 22ZM480-59Q308-201 223.5-320T139-555q0-159.72 103.04-253.86Q345.08-903 480-903q134.49 0 238.25 94.14Q822-714.72 822-555q0 116-85 235T480-59Z" /></svg>
    )
}
export default LocationIcon