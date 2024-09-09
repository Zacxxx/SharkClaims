'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, X, RotateCcw, Upload, Search, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface CameraInterfaceProps {
  onClose: () => void;
}

export function CameraInterface({ onClose }: CameraInterfaceProps) {
  const [capturedImages, setCapturedImages] = useState<Array<{ src: string; selected: boolean }>>([
    { src: "/placeholder.svg?height=100&width=100", selected: false },
    { src: "/placeholder.svg?height=100&width=100", selected: false },
    { src: "/placeholder.svg?height=100&width=100", selected: false }
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const captureImage = () => {
    const newImage = { src: "/placeholder.svg?height=100&width=100", selected: false }
    setCapturedImages([newImage, ...capturedImages.slice(0, 5)])
  }

  const toggleImageSelection = (index: number) => {
    setCapturedImages(capturedImages.map((img, i) => 
      i === index ? { ...img, selected: !img.selected } : img
    ))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map(file => ({
        src: URL.createObjectURL(file),
        selected: false
      }))
      setCapturedImages([...newImages, ...capturedImages].slice(0, 6))
    }
  }

  const analyzeImages = () => {
    const selectedImages = capturedImages.filter(img => img.selected)
    console.log("Analyzing images:", selectedImages)
  }

  const deleteSelectedImages = () => {
    setCapturedImages(capturedImages.filter(img => !img.selected))
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container flex items-center justify-center min-h-screen py-4 px-2">
        <Card className="w-full max-w-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Capture d'image</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="aspect-[4/3] bg-muted mb-4 rounded-lg overflow-hidden relative">
              <video className="w-full h-full object-cover">
                Votre navigateur ne supporte pas la vidéo.
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Aperçu de la caméra</p>
              </div>
            </div>
            <div className="flex justify-center items-center mb-4 space-x-2">
              <Button onClick={captureImage} size="sm">
                <Camera className="mr-2 h-4 w-4" />
                Capturer
              </Button>
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Charger
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button variant="outline" size="sm">
                <RotateCcw className="mr-2 h-4 w-4" />
                Changer
              </Button>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Images du sinistre</h3>
              <div className="h-40 overflow-y-auto pr-2">
                <div className="grid grid-cols-3 gap-2">
                  {capturedImages.map((img, index) => (
                    <div key={index} className="aspect-square bg-muted rounded-md overflow-hidden relative">
                      <img src={img.src} alt={`Image capturée ${index + 1}`} className="w-full h-full object-cover" />
                      <Checkbox
                        checked={img.selected}
                        onCheckedChange={() => toggleImageSelection(index)}
                        className="absolute top-1 right-1 bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button variant="destructive" size="sm" onClick={deleteSelectedImages}>
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
              <Button onClick={analyzeImages} size="sm">
                <Search className="mr-2 h-4 w-4" />
                Analyser
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}