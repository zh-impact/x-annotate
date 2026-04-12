import { useNavigate } from '@tanstack/react-router'
import { Button } from '@xnote/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@xnote/ui/components/dialog'
import { Field, FieldGroup } from '@xnote/ui/components/field'
import { Input } from '@xnote/ui/components/input'
import { Label } from '@xnote/ui/components/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@xnote/ui/components/select'
import { useState } from 'react'

import { getImageDimensions } from '@/shared'
import { useAnnoteStore } from '@/store'

export function StartEntry() {
  const navigate = useNavigate()
  const setCanvas = useAnnoteStore((s) => s.setCanvas)

  const [value, setValue] = useState<string | null>('640x480')

  const handleCreateImage = () => {
    const [width, height] = value?.split('x') ?? ['640', '480']
    console.log('Create blank image with size:', width, height)
    setCanvas({
      initialized: true,
      width: parseInt(width),
      height: parseInt(height),
      fileUrl: null,
    })
    navigate({ to: '/annotate' })
  }

  const handleUploadImage = (file: File | null) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      getImageDimensions(fileUrl).then((dimensions) => {
        setCanvas({
          initialized: true,
          width: dimensions.width,
          height: dimensions.height,
          fileUrl,
        })
      })
    }
  }

  return (
    <div className="h-full flex gap-16 items-center justify-center">
      <Input
        type="file"
        onInput={(e) => handleUploadImage((e.target as HTMLInputElement).files?.[0] ?? null)}
        accept="image/png,image/jpeg"
      />

      <div className="w-[2px] h-48 bg-slate-200 flex items-center justify-center">
        <span className="p-2 bg-slate-500 text-slate-100">or</span>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Blank Image</Button>
        </DialogTrigger>

        <DialogContent aria-describedby="">
          <DialogHeader>
            <DialogTitle>Select Image Size</DialogTitle>
            <DialogDescription>
              Choose a size for the blank image you want to create.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label>Image Size</Label>
              <Select value={value ?? ''} onValueChange={setValue}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select image size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="640x480">640x480</SelectItem>
                    <SelectItem value="800x600">800x600</SelectItem>
                    <SelectItem value="1024x768">1024x768</SelectItem>
                    <SelectItem value="1280x720">1280x720</SelectItem>
                    <SelectItem value="1920x1080">1920x1080</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button onClick={handleCreateImage}>Create</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
