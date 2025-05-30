"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export default function ResizableCardGrid() {
    const [gridX, setGridX] = useState(3);
    const [gridY, setGridY] = useState(2);
    const [key, setKey] = useState(0);
    const [containerDimensions] = useState({ width: 800, height: 600 });
    const containerRef = useRef(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                /*const rect = containerRef.current.getBoundingClientRect();
                setContainerDimensions({
                    width: rect.width,
                    height: rect.height
                });*/
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [key]);

    const updateGrid = () => {
        setKey(prev => prev + 1);
    };

    const renderResizableGrid = () => {
        const rows = [];
        const minCardWidth = 200;
        const minCardHeight = 150;
        const { width: containerWidth, height: containerHeight } = containerDimensions;
        const minCardWidthPercent = Math.max(15, (minCardWidth / containerWidth) * 100);
        const minRowHeightPercent = Math.max(15, (minCardHeight / containerHeight) * 100);

        for (let row = 0; row < gridY; row++) {
            const rowCards = [];
            for (let col = 0; col < gridX; col++) {
                const cardId = row * gridX + col + 1;
                rowCards.push(
                    <ResizablePanel
                        key={`card-${row}-${col}`}
                        defaultSize={100 / gridX}
                        minSize={minCardWidthPercent}
                        maxSize={85}
                    >
                        <div className="p-2 h-full">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card {cardId}</CardTitle>
                                    <CardDescription>
                                        Row {row + 1}, Column {col + 1}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Content</p>
                                </CardContent>
                            </Card>
                        </div>
                    </ResizablePanel>
                );
                if (col < gridX - 1) {
                    rowCards.push(
                        <ResizableHandle
                            key={`v-handle-${row}-${col}`}
                        />
                    );
                }
            }
            rows.push(
                <ResizablePanel
                    key={`row-${row}`}
                    defaultSize={100 / gridY}
                    minSize={minRowHeightPercent}
                    maxSize={85}
                >
                    <ResizablePanelGroup direction="horizontal" className="h-full">
                        {rowCards}
                    </ResizablePanelGroup>
                </ResizablePanel>
            );
            if (row < gridY - 1) {
                rows.push(<ResizableHandle key={`col${row}`} />);
            }
        }
        return rows;
    };

    return (
        <div className="w-full min-h-screen p-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Resizable Card Grid</h1>
                <p className="mb-4">Cards can be resized both horizontally and vertically</p>

                <div className="flex gap-4 items-end p-4 rounded-lg border shadow-sm">
                    <div>
                        <label className="block text-sm font-medium mb-1">Columns (X):</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={gridX}
                            onChange={(e) => setGridX(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
                            className="border rounded px-3 py-2 w-20 text-center"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Rows (Y):</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={gridY}
                            onChange={(e) => setGridY(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
                            className="border rounded px-3 py-2 w-20 text-center"
                        />
                    </div>

                    <button
                        onClick={updateGrid}
                        className="px-4 py-2 rounded transition-colors"
                    >
                        Update Grid ({gridX}×{gridY})
                    </button>

                    <div className="text-sm ml-4">Total Cards: {gridX * gridY}</div>
                </div>
            </div>

            <div
                ref={containerRef}
                className="rounded-lg border shadow-sm overflow-hidden"
                style={{ height: '600px' }}
            >
                <div key={key} className="h-full">
                    <ResizablePanelGroup direction="vertical" className="h-full">
                        {renderResizableGrid()}
                    </ResizablePanelGroup>
                </div>
            </div>

            {/* Instructions removed as per your last request */}
        </div>
    );
}
