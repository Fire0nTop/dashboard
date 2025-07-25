"use client"
import { useEffect, useMemo, useRef, useState } from 'react'
import './style.css'
import { SlotItemMapArray, Swapy, utils } from 'swapy'
import { createSwapy } from 'swapy'

type Item = {
    id: string
    title: string
}

const initialItems: Item[] = [
    { id: '1', title: '1' },
    { id: '2', title: '2' },
    { id: '3', title: '3' },
]

let id = 4

function SwapyTest() {
    const [items, setItems] = useState<Item[]>(initialItems)
    const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(utils.initSlotItemMap(items, 'id'))
    const slottedItems = useMemo(() => utils.toSlottedItems(items, 'id', slotItemMap), [items, slotItemMap])
    const swapyRef = useRef<Swapy | null>(null)

    const containerRef = useRef<HTMLDivElement>(null)

    // Fix: Add slotItemMap to the dependency array
    useEffect(() => {
        utils.dynamicSwapy(swapyRef.current, items, 'id', slotItemMap, setSlotItemMap)
    }, [items, slotItemMap])

    useEffect(() => {
        swapyRef.current = createSwapy(containerRef.current!, {
            manualSwap: true,
            animation: 'dynamic'
        })

        swapyRef.current.onSwap((event) => {
            setSlotItemMap(event.newSlotItemMap.asArray)
        })

        return () => {
            swapyRef.current?.destroy()
        }
    }, [])

    return (
        <div className="container" ref={containerRef}>
            <div className="items">
                {slottedItems.map(({ slotId, itemId, item }) => (
                    <div className="slot" key={slotId} data-swapy-slot={slotId}>
                        {item &&
                            <div className="item" data-swapy-item={itemId} key={itemId}>
                                <span>{item.title}</span>
                                <span className="delete" data-swapy-no-drag onClick={() => {
                                    setItems(items.filter(i => i.id !== item.id))
                                }}></span>
                            </div>
                        }
                    </div>
                ))}
            </div>
            <div className="item item--add" onClick={() => {
                const newItem: Item = { id: `${id}`, title: `${id}` }
                setItems([...items, newItem])
                id++
            }}>+</div>
        </div>
    )
}

export default SwapyTest