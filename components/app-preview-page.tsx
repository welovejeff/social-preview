'use client'

import * as React from "react"
import { useDropzone } from "react-dropzone"
import {
  ChevronDown,
  Image as ImageIcon,
  Save,
  Star,
  StarOff,
  User2,
  X as XIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

// Sample data structure
const sampleData = {
  favorites: [
    { id: 1, name: "Favorited Asset 1" },
    { id: 2, name: "Favorited Asset 2" },
  ],
  clients: [
    {
      id: 1,
      name: "Client 1",
      projects: [
        {
          id: 1,
          name: "Project 1",
          assets: [
            { id: 1, name: "Asset 1" },
            { id: 2, name: "Asset 2" },
          ],
        },
        {
          id: 2,
          name: "Project 2",
          assets: [
            { id: 3, name: "Asset 1" },
            { id: 4, name: "Asset 2" },
          ],
        },
      ],
    },
  ],
}

const platforms = [
  { id: "instagram", name: "Instagram", aspectRatio: "aspect-square" },
  { id: "facebook", name: "Facebook", aspectRatio: "aspect-video" },
  { id: "tiktok", name: "TikTok", aspectRatio: "aspect-[9/16]" },
  { id: "x", name: "X", aspectRatio: "aspect-video" },
]

function TopNavigation() {
  return (
    <div className="flex h-14 items-center justify-between border-b px-4">
      <h1 className="text-xl font-semibold">Social Preview</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 text-sm">
            Username
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <User2 className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <XIcon className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function LeftSidebar() {
  return (
    <div className="w-[300px] border-r p-4">
      <h2 className="mb-4 text-lg font-semibold">Social Previews</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          {sampleData.favorites.map((favorite) => (
            <Button
              key={favorite.id}
              variant="ghost"
              className="w-full justify-start"
            >
              <Star className="mr-2 h-4 w-4" />
              {favorite.name}
            </Button>
          ))}
        </div>
        {sampleData.clients.map((client) => (
          <Collapsible key={client.id}>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
              {client.name}
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 pt-2">
              {client.projects.map((project) => (
                <div key={project.id} className="space-y-2">
                  <div className="font-medium">{project.name}</div>
                  {project.assets.map((asset) => (
                    <Button
                      key={asset.id}
                      variant="ghost"
                      className="w-full justify-start pl-4 text-sm"
                    >
                      {asset.name}
                    </Button>
                  ))}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}

function RightSidebar({ selectedPlatform, setSelectedPlatform }) {
  return (
    <div className="w-[300px] border-l p-4">
      <h2 className="mb-4 text-lg font-semibold">Preview Options</h2>
      <div className="space-y-2">
        {platforms.map((platform) => (
          <Button
            key={platform.id}
            variant={selectedPlatform.id === platform.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setSelectedPlatform(platform)}
          >
            {platform.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

function MainContent({ selectedPlatform, previewImage, setPreviewImage }) {
  const { toast } = useToast()

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        })
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [toast, setPreviewImage])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  })

  return (
    <main className="flex-1 p-4">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" size="icon">
          <Save className="h-4 w-4" />
        </Button>
        <Button>Export</Button>
      </div>

      <div
        {...getRootProps()}
        className={`relative flex min-h-[500px] items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
          isDragActive ? "border-primary" : "border-muted-foreground/25"
        }`}
      >
        <input {...getInputProps()} />
        {previewImage ? (
          <div className={`relative h-full w-full p-4 ${selectedPlatform.aspectRatio}`}>
            <img
              src={previewImage}
              alt="Preview"
              className="h-full w-full rounded object-cover"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <svg
              className="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-base">Drop Asset Here To Start Previewing</p>
            <p className="text-sm text-muted-foreground">Supports images and videos</p>
          </div>
        )}
      </div>
    </main>
  )
}

export function BlockPage() {
  const [selectedPlatform, setSelectedPlatform] = React.useState(platforms[0])
  const [previewImage, setPreviewImage] = React.useState<string | null>(null)

  return (
    <div className="flex h-screen flex-col">
      <TopNavigation />
      <div className="flex flex-1">
        <LeftSidebar />
        <MainContent
          selectedPlatform={selectedPlatform}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
        <RightSidebar
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
        />
      </div>
    </div>
  )
}