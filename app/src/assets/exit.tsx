
const ExitIcon = (h?: string, w?: string, color?: string) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={h || "48px"} viewBox="0 -960 960 960" width={w || "48px"} fill={color || "#1f1f1f"}><path d="M190-99q-37.18 0-64.09-26.91Q99-152.82 99-190v-188h91v188h580v-580H190v187H99v-187q0-37.59 26.91-64.79Q152.82-862 190-862h580q37.59 0 64.79 27.21Q862-807.59 862-770v580q0 37.18-27.21 64.09Q807.59-99 770-99H190Zm238-162-67-66 107-108H99v-91h369L361-634l67-65 219 219-219 219Z" /></svg>)
}

export default ExitIcon


