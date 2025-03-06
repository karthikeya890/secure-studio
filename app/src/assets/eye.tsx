
const Eye = (h?: string, w?: string, color?: string) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w || "48"} height={h || "48"} viewBox="0 -960 960 960" fill={color || ""}><path d="M480.29-333q69.71 0 118.21-48.79 48.5-48.8 48.5-118.5 0-69.71-48.79-118.21-48.8-48.5-118.5-48.5-69.71 0-118.21 48.79-48.5 48.8-48.5 118.5 0 69.71 48.79 118.21 48.8 48.5 118.5 48.5Zm-.41-71q-39.46 0-67.67-28.33Q384-460.65 384-500.12q0-39.46 28.33-67.67Q440.65-596 480.12-596q39.46 0 67.67 28.33Q576-539.35 576-499.88q0 39.46-28.33 67.67Q519.35-404 479.88-404Zm.12 224q-151 0-274.5-89T21-500q61-142 184.5-231T480-820q151 0 274.5 89T939-500q-61 142-184.5 231T480-180Zm0-320Zm-.08 240q121.45 0 221.06-65.04Q800.58-390.08 854-500q-53.42-109.92-152.94-174.96Q601.53-740 480.08-740q-121.45 0-221.56 65.04Q158.42-609.92 105-500q53.42 109.92 153.44 174.96Q358.47-260 479.92-260Z" /></svg>
    )
}

export default Eye