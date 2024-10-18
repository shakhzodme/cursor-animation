import React from 'react'
import { motion } from "framer-motion"

type Coords = {
    x: number,
    y: number,
    element: DOMRect | null
}

const useMouse: () => Coords = () => {
    const [coords, setCoords] = React.useState<Coords>({
        x: 0,
        y: 0,
        element: null,
    })

    React.useEffect(() => {
        const fn = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const element: HTMLElement | null = target?.closest?.("[data-super-cursor]") ?? null
            let domrect = null
            const t0 = element?.getClientRects?.()

            if (t0 && t0.length > 0) {
                domrect = t0.item(0)
            }

            setCoords({
                x: event.clientX, y: event.clientY, element: domrect
            })
        }

        document.body.addEventListener("mousemove", fn)

        return () => {
            document.body.removeEventListener("mousemove", fn)
        }
    }, [])

    return coords
}

export const Cursor: React.FC = () => {
    const mouse = useMouse()
    const { x, y, element } = mouse

    return <>
        <div
            style={{
                position: "fixed",
                top: y,
                left: x,
                height: "4px",
                width: "4px",
                background: "white",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: "999999"
            }}
        />
        <motion.div
            animate={{
                x: element ? element.x + 16 : x,
                y: element ? element.y + 16 : y,
                height: element ? element.height : "32px",
                width: element ? element.width : "32px",
                borderRadius: element ? "4px" : "50%",
            }}
            style={{
                top: "-16px",
                left: "-16px",
                position: "fixed",
                border: "1px solid white",
                pointerEvents: "none",
                zIndex: "999999"
            }}
        />
    </>
}