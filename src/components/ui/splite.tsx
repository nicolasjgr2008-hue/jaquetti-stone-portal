'use client'

import { Suspense, lazy, useRef, useEffect, useState } from 'react'
import type { Application, SPEObject } from '@splinetool/runtime'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  followMouse?: boolean
}

export function SplineScene({ scene, className, followMouse = false }: SplineSceneProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  if (isMobile) return null;
  const splineRef = useRef<Application | null>(null)
  const robotRef = useRef<SPEObject | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!followMouse) return

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [followMouse])

  useEffect(() => {
    if (!followMouse || !robotRef.current) return

    // Apply rotation based on mouse position
    const robot = robotRef.current
    
    // Smooth rotation following mouse
    const targetRotationY = mousePosition.x * 0.5 // Horizontal rotation
    const targetRotationX = -mousePosition.y * 0.3 // Vertical rotation (inverted)
    
    robot.rotation.y = targetRotationY
    robot.rotation.x = targetRotationX
  }, [mousePosition, followMouse])

  const onLoad = (spline: Application) => {
    splineRef.current = spline
    
    if (followMouse) {
      // Try to find the robot/head object in the scene
      // Common names for main objects in Spline scenes
      const objectNames = ['Robot', 'Head', 'Character', 'Main', 'Object']
      
      for (const name of objectNames) {
        const obj = spline.findObjectByName(name)
        if (obj) {
          robotRef.current = obj
          break
        }
      }
      
      // If no specific object found, try to get the first object
      if (!robotRef.current) {
        const allObjects = spline.getAllObjects()
        if (allObjects && allObjects.length > 0) {
          // Get the first mesh-type object
          robotRef.current = allObjects.find(obj => obj.name && !obj.name.includes('Camera') && !obj.name.includes('Light')) || allObjects[0]
        }
      }
    }
  }

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={onLoad}
      />
    </Suspense>
  )
}
