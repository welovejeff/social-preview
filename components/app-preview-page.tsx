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
import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Add these imports at the top of the file
import LinkedInReaction from './linkedin-reaction';
import LinkedInReactionsSprite from './linkedin-reactions-sprite';
import Image from 'next/image'

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
  { id: "instagram-post", name: "Instagram Post", aspectRatio: "aspect-square" },
  { id: "instagram-reel", name: "Instagram Reel", aspectRatio: "aspect-[9/16]" },
  { id: "facebook", name: "Facebook", aspectRatio: "aspect-video" },
  { id: "tiktok", name: "TikTok", aspectRatio: "aspect-[9/16]" },
  { id: "x", name: "X", aspectRatio: "aspect-video" },
  { id: "threads", name: "Threads", aspectRatio: "aspect-[4/5]" },
  { id: "linkedin", name: "LinkedIn", aspectRatio: "aspect-video" },
  { id: "pinterest", name: "Pinterest", aspectRatio: "aspect-[2/3]" }
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

// Define the types for the props
type RightSidebarProps = {
  selectedPlatform: string;
  setSelectedPlatform: React.Dispatch<React.SetStateAction<string>>;
  brandName: string;
  setBrandName: React.Dispatch<React.SetStateAction<string>>;
  profileImage: string | null;
  setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
  isVerified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
};

function RightSidebar({ 
  selectedPlatform, 
  setSelectedPlatform, 
  brandName, 
  setBrandName, 
  profileImage, 
  setProfileImage,
  isVerified,
  setIsVerified 
}: RightSidebarProps) {
  return (
    <div className="w-[300px] border-l p-4">
      <h2 className="mb-4 text-lg font-semibold">Brand Settings</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Enter brand name"
          className="w-full p-2 border rounded"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm">Verified Account</span>
          <button
            onClick={() => setIsVerified(!isVerified)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isVerified ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isVerified ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onload = (event) => {
                setProfileImage(event.target?.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full p-2 border rounded"
        />
        {profileImage && (
          <div className="flex items-center mt-2">
            <Image 
              src={profileImage}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
            <span className="text-sm">{brandName}</span>
          </div>
        )}
      </div>
      <h2 className="mt-6 mb-4 text-lg font-semibold">Preview Options</h2>
      <div className="space-y-2">
        {platforms.map((platform) => (
          <Button
            key={platform.id}
            variant={selectedPlatform === platform.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setSelectedPlatform(platform.id)}
          >
            {platform.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

// Keep these type definitions at the top
type MediaType = {
  url: string;
  type: 'image' | 'video';
};

// Add this after the type definitions and before the component functions
const reactionColors = {
  like: '#0A66C2',
  celebrate: '#44712E',
  support: '#7A3ED5',
  love: '#B24020',
  insightful: '#DAA520',
  funny: '#F5B668'
} as const;

// Update the LinkedInReactionType to use the keys of reactionColors
type LinkedInReactionType = keyof typeof reactionColors;

type Reaction = 'like' | 'love' | 'haha' | LinkedInReactionType;

type SocialMetrics = {
  likes: number;
  comments: number;
  shares: number;
  bookmarks?: number;
  followers?: number;
  reactions: Reaction[];
};

type MainContentProps = {
  selectedPlatform: string;
  previewMedia: MediaType[];
  setPreviewMedia: React.Dispatch<React.SetStateAction<MediaType[]>>;
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
  postCopy: string;
  setPostCopy: React.Dispatch<React.SetStateAction<string>>;
  brandName: string;
  profileImage: string | null;
  isVerified: boolean;
};

// Add this helper function near your other utility functions
const getRandomReactions = (count: number): LinkedInReactionType[] => {
  const allReactions: LinkedInReactionType[] = ['like', 'celebrate', 'support', 'love', 'insightful', 'funny'];
  const shuffled = [...allReactions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, 3)); // Show max 3 reactions
};

// First, let's define proper types for the PlatformSpecificUI props
type PlatformSpecificUIProps = {
  platform: string;
  previewMedia: MediaType[];
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
  postCopy: string;
  setPostCopy: React.Dispatch<React.SetStateAction<string>>;
  brandName: string;
  profileImage: string | null;
  isVerified: boolean;
  metrics: SocialMetrics;
  setMetrics: React.Dispatch<React.SetStateAction<SocialMetrics>>;
};

// Add this reusable MetricPopover component inside PlatformSpecificUI
const MetricPopover = ({ 
  metric, 
  value, 
  onValueChange 
}: { 
  metric: string;
  value: number;
  onValueChange: (value: number) => void;
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <button className="hover:underline">
        {formatNumber(value)}
      </button>
    </PopoverTrigger>
    <PopoverContent className="w-52 p-2" side="top">
      <div className="space-y-2">
        <label className="text-sm font-medium">{metric} count</label>
        <input
          type="text"
          value={value.toLocaleString()}
          onChange={(e) => {
            const cleanValue = e.target.value.replace(/[^\d,]/g, '');
            const numValue = parseInt(cleanValue.replace(/,/g, ''), 10);
            if (!isNaN(numValue)) {
              onValueChange(numValue);
            }
          }}
          className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <button
            onClick={() => onValueChange(1000)}
            className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
          >
            1K
          </button>
          <button
            onClick={() => onValueChange(10000)}
            className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
          >
            10K
          </button>
          <button
            onClick={() => onValueChange(1000000)}
            className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
          >
            1M
          </button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

// Update the handleMetricClick function to be inside PlatformSpecificUI
function PlatformSpecificUI({ 
  platform,
  previewMedia,
  currentMediaIndex,
  setCurrentMediaIndex,
  postCopy,
  setPostCopy,
  brandName,
  profileImage,
  isVerified,
  metrics,
  setMetrics
}: PlatformSpecificUIProps) {
  const handleMetricClick = (metric: keyof SocialMetrics | LinkedInReactionType) => {
    if (metric === 'likes') {
      setMetrics(prev => {
        const newLikes = prev.likes + 1;
        const newReactions = newLikes > 0 ? getRandomReactions(Math.min(3, Math.ceil(newLikes / 2))) : [];
        return {
          ...prev,
          likes: newLikes,
          reactions: newReactions
        };
      });
    } else {
      setMetrics(prev => ({
        ...prev,
        [metric]: (prev[metric as keyof SocialMetrics] as number || 0) + Math.floor(Math.random() * 10) + 1
      }));
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostCopy(e.target.value);
  };

  const nextImage = () => {
    setCurrentMediaIndex((prev: number) => (prev + 1) % previewMedia.length);
  };

  const previousImage = () => {
    setCurrentMediaIndex((prev: number) => (prev - 1 + previewMedia.length) % previewMedia.length);
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    
    const parts = text.split(/(\s+|(?=[@#])|(?<=[@#]\w+\s))/g);
    return parts.map((part, index) => {
      if (part.match(/^[@#]\w+/)) {
        return <span key={index} className="text-blue-500">{part}</span>;
      }
      return part;
    });
  };

  // Add this inside the PlatformSpecificUI component, alongside other helper functions
  const renderReactions = (reactions: Reaction[]) => {
    const reactionIcons: Record<Reaction, JSX.Element> = {
      like: (
        <div className="w-[18px] h-[18px] rounded-full bg-[#1877F2] flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 9h3l-4-4-4 4h3v6H9l4 4 4-4h-3z"/>
          </svg>
        </div>
      ),
      love: (
        <div className="w-[18px] h-[18px] rounded-full bg-[#ED2B45] flex items-center justify-center">
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      ),
      haha: (
        <div className="w-[18px] h-[18px] rounded-full bg-[#F7B125] flex items-center justify-center">
          <span className="text-[10px] leading-none">😆</span>
        </div>
      ),
      celebrate: (
        <div className="w-[18px] h-[18px] rounded-full bg-[#44712E] flex items-center justify-center">
          <span className="text-[10px] leading-none text-white">🎉</span>
        </div>
      ),
      support: (
        <div className="w-[18px] h-[18px] rounded-full bg-[#7A3ED5] flex items-center justify-center">
          <span className="text-[10px] leading-none text-white">💪</span>
        </div>
      ),
      insightful: (
        <div className="w-[18px] h-[18px] rounded-full bg-[#DAA520] flex items-center justify-center">
          <span className="text-[10px] leading-none text-white">💡</span>
        </div>
      ),
      funny: (
        <div className="w-[18px] h-[18px] rounded-full bg-[#F5B668] flex items-center justify-center">
          <span className="text-[10px] leading-none text-white">😄</span>
        </div>
      )
    };

    return (
      <div className="flex -space-x-1">
        {Array.from(new Set(reactions)).map((reaction, index) => (
          <div key={index} className="relative" style={{ zIndex: 3 - index }}>
            {reactionIcons[reaction]}
          </div>
        ))}
      </div>
    );
  };

  // Instead of using renderContent, let's directly use the switch statement
  switch (platform) {
    case "instagram-post":
      return (
        <div className="instagram-style border rounded-lg p-4 bg-white shadow-md max-w-md mx-auto">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {profileImage ? (
                <Image 
                  src={profileImage}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full mr-2"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-300 mr-2"></div>
              )}
              <div className="flex items-center">
                <span className="font-semibold mr-1">{brandName}</span>
                {isVerified && (
                  <svg width='16' height='16' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
                    <g transform="matrix(0.42 0 0 0.42 12 12)">
                      <g>
                        <polygon fill="rgb(66,165,245)" points="5.62,-21 9.05,-15.69 15.37,-15.38 15.69,-9.06 21,-5.63 18.12,0 21,5.62 15.69,9.05 15.38,15.37 9.06,15.69 5.63,21 0,18.12 -5.62,21 -9.05,15.69 -15.37,15.38 -15.69,9.06 -21,5.63 -18.12,0 -21,-5.62 -15.69,-9.05 -15.38,-15.37 -9.06,-15.69 -5.63,-21 0,-18.12"/>
                        <polygon fill="rgb(255,255,255)" points="-2.6,6.74 -9.09,0.25 -6.97,-1.87 -2.56,2.53 7,-6.74 9.09,-4.59"/>
                      </g>
                    </g>
                  </svg>
                )}
              </div>
            </div>
          </div>

          {previewMedia.length > 0 && (
            <>
              <div className="relative w-full mb-2">
                {previewMedia[currentMediaIndex].type === 'image' ? (
                  <Image 
                    src={previewMedia[currentMediaIndex].url} 
                    alt={`Preview ${currentMediaIndex + 1}`} 
                    className="w-full rounded object-cover" 
                    width={300}
                    height={300}
                  />
                ) : (
                  <video 
                    src={previewMedia[currentMediaIndex].url}
                    className="w-full h-full object-cover"
                    controls
                    title={`Preview ${currentMediaIndex + 1}`}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
                {previewMedia.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75"
                      style={{ display: currentMediaIndex === 0 ? 'none' : 'block' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75"
                      style={{ display: currentMediaIndex === previewMedia.length - 1 ? 'none' : 'block' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              {previewMedia.length > 1 && (
                <div className="flex items-center justify-center space-x-1.5 mb-2">
                  {previewMedia.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        index === currentMediaIndex 
                          ? 'bg-blue-500' 
                          : 'bg-gray-300/80'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          <div className="flex items-center justify-between text-gray-500 mt-2">
            <div className="flex items-center space-x-4">
              <button onClick={() => handleMetricClick('likes')} className="group">
                <HeartIcon className={`h-6 w-6 ${metrics.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <button onClick={() => handleMetricClick('comments')}>
                <ChatBubbleOvalLeftIcon className="h-6 w-6" />
              </button>
              <button onClick={() => handleMetricClick('shares')}>
                <PaperAirplaneIcon className="h-6 w-6" />
              </button>
            </div>
            <button>
              <BookmarkIcon className="h-6 w-6" />
            </button>
          </div>

          {(metrics.likes > 0 || metrics.comments > 0 || metrics.shares > 0) && (
            <div className="text-sm font-semibold mt-2">
              {metrics.likes > 0 && (
                <div>
                  <MetricPopover
                    metric="Likes"
                    value={metrics.likes}
                    onValueChange={(value) => setMetrics(prev => ({ ...prev, likes: value }))}
                  /> likes
                </div>
              )}
            </div>
          )}

          <div className="text-sm mt-2">
            <div className="relative flex-1">
              <textarea
                value={postCopy}
                onChange={handleInput}
                placeholder="Write your caption..."
                className="absolute inset-0 w-full p-0 border-none focus:outline-none focus:ring-0 resize-none bg-transparent placeholder:text-gray-400 text-transparent caret-gray-700 z-10"
                style={{
                  overflow: 'hidden',
                  lineHeight: '1.5',
                  marginTop: '-2px',
                }}
                rows={1}
              />
              <div 
                className="relative w-full p-0 pointer-events-none"
                style={{
                  lineHeight: '1.5',
                  marginTop: '-2px',
                  minHeight: '1.5em',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                <span className="font-semibold mr-1">{brandName}</span>
                {postCopy ? renderFormattedText(postCopy) : (
                  <span className="text-gray-400">Write your caption...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      );

    case "instagram-reel":
      return (
        <div className="instagram-reel-style border rounded-lg bg-black max-w-[400px] mx-auto aspect-[9/16] relative overflow-hidden">
          {previewMedia.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {previewMedia[currentMediaIndex].type === 'video' ? (
                <video
                  src={previewMedia[currentMediaIndex].url}
                  className="h-full w-full object-cover"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <Image 
                  src={previewMedia[currentMediaIndex].url}
                  alt={`Preview ${currentMediaIndex + 1}`}
                  className="h-full w-full object-cover"
                  width={400}
                  height={300}
                />
              )}
            </div>
          )}
          
          {/* Reel UI Overlay */}
          <div className="absolute inset-0 flex">
            {/* Left side - Main content */}
            <div className="flex-1 flex flex-col justify-end p-4">
              <div className="flex items-center mb-2">
                {profileImage ? (
                  <Image 
                    src={profileImage}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full mr-2 border-2 border-white"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-300 mr-2 border-2 border-white"></div>
                )}
                <span className="text-white font-semibold mr-1">{brandName}</span>
                {isVerified && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"/>
                  </svg>
                )}
              </div>
              
              {/* Caption input area */}
              <div className="relative mb-4 w-full">
                <textarea
                  value={postCopy}
                  onChange={handleInput}
                  placeholder="Write your reel caption..."
                  className="absolute inset-0 w-full bg-transparent text-white text-sm border-none focus:outline-none focus:ring-0 resize-none placeholder:text-gray-400 text-transparent caret-white z-10"
                  style={{
                    overflow: 'hidden',
                    lineHeight: '1.5',
                    marginTop: '-2px',
                  }}
                  rows={1}
                />
                <div 
                  className="relative w-full p-0 pointer-events-none text-white text-sm"
                  style={{
                    lineHeight: '1.5',
                    marginTop: '-2px',
                    minHeight: '1.5em',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {postCopy ? renderFormattedText(postCopy) : (
                    <span className="text-gray-400">Write your reel caption...</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right side - Actions */}
            <div className="w-16 flex flex-col items-center justify-end p-4 space-y-4">
              <div className="flex flex-col items-center">
                <button 
                  onClick={() => handleMetricClick('likes')}
                  className="text-white mb-1"
                >
                  <HeartIcon className={`h-7 w-7 ${metrics.likes > 0 ? 'fill-white' : ''}`} />
                </button>
                <span className="text-white text-xs font-semibold">
                  {formatNumber(metrics.likes)}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <button 
                  onClick={() => handleMetricClick('comments')}
                  className="text-white mb-1"
                >
                  <ChatBubbleOvalLeftIcon className="h-7 w-7" />
                </button>
                <span className="text-white text-xs font-semibold">
                  {formatNumber(metrics.comments)}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <button 
                  onClick={() => handleMetricClick('shares')}
                  className="text-white mb-1"
                >
                  <PaperAirplaneIcon className="h-7 w-7" />
                </button>
                <span className="text-white text-xs font-semibold">
                  {formatNumber(metrics.shares)}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <button 
                  onClick={() => handleMetricClick('bookmarks')}
                  className="text-white"
                >
                  <BookmarkIcon className={`h-7 w-7 ${metrics.bookmarks ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case "facebook":
      return (
        <div className="facebook-style border rounded-lg p-4 bg-white shadow-md max-w-[500px] mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex">
              {profileImage ? (
                <Image 
                  src={profileImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
              )}
              <div>
                <div className="flex items-center">
                  <span className="font-bold mr-1">{brandName}</span>
                  {isVerified && (
                    <svg className="w-4 h-4 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"/>
                    </svg>
                  )}
                </div>
                <div className="text-xs text-gray-500">Just now · 🌎</div>
              </div>
            </div>
            <button className="text-gray-500 hover:bg-gray-100 rounded-full p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>

          {/* Post Text */}
          <div className="text-sm mb-3">
            <div className="relative flex-1">
              <textarea
                value={postCopy}
                onChange={handleInput}
                placeholder="What&apos;s on your mind?"
                className="absolute inset-0 w-full p-0 border-none focus:outline-none focus:ring-0 resize-none bg-transparent placeholder:text-gray-400 text-transparent caret-gray-700 z-10"
                style={{
                  overflow: 'hidden',
                  lineHeight: '1.5',
                  marginTop: '-2px',
                }}
                rows={1}
              />
              <div 
                className="relative w-full p-0 pointer-events-none"
                style={{
                  lineHeight: '1.5',
                  marginTop: '-2px',
                  minHeight: '1.5em',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {postCopy ? renderFormattedText(postCopy) : (
                  <span className="text-gray-400">What&apos;s on your mind?</span>
                )}
              </div>
            </div>
          </div>

          {/* Media Content */}
          {previewMedia.length > 0 && (
            <div className="relative rounded-lg overflow-hidden mb-3">
              {previewMedia[0].type === 'video' ? (
                <video
                  src={previewMedia[0].url}
                  className="w-full rounded-lg"
                  controls
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className={`grid gap-1 ${
                  previewMedia.length === 1 ? 'grid-cols-1' : 
                  previewMedia.length === 2 ? 'grid-cols-2' :
                  previewMedia.length === 3 ? 'grid-cols-2' :
                  previewMedia.length === 4 ? 'grid-cols-2' :
                  'grid-cols-2'
                }`}>
                  {previewMedia.slice(0, 5).map((media, index) => {
                    if (previewMedia.length === 3 && index === 0) {
                      return (
                        <div key={index} className="col-span-2">
                          <Image
                            src={media.url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-[300px] object-cover rounded-t-lg"
                            width={300}
                            height={300}
                          />
                        </div>
                      );
                    }
                    
                    if (previewMedia.length === 5 && index === 4) {
                      return (
                        <div key={index} className="relative">
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <span className="text-white text-xl font-semibold">+{previewMedia.length - 4}</span>
                          </div>
                          <Image
                            src={media.url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-[200px] object-cover rounded-lg"
                            width={300}
                            height={200}
                          />
                        </div>
                      );
                    }

                    return (
                      <Image
                        key={index}
                        src={media.url}
                        alt={`Preview ${index + 1}`}
                        className={`w-full ${
                          previewMedia.length === 2 ? 'h-[400px]' :
                          previewMedia.length === 3 && index > 0 ? 'h-[200px]' :
                          previewMedia.length === 4 ? 'h-[200px]' :
                          previewMedia.length >= 5 ? 'h-[200px]' :
                          'h-[300px]'
                        } object-cover rounded-lg`}
                        width={300}
                        height={300}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Engagement Stats */}
          {(metrics.likes > 0 || metrics.comments > 0 || metrics.shares > 0) && (
            <div className="flex items-center justify-between text-sm text-gray-500 pb-3 border-b">
              <div className="flex items-center gap-2">
                {metrics.reactions.length > 0 ? (
                  <>
                    {renderReactions(metrics.reactions)}
                    <span>{formatNumber(metrics.likes)}</span>
                  </>
                ) : (
                  <>
                    <div className="w-[18px] h-[18px] rounded-full bg-[#1877F2] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 9h3l-4-4-4 4h3v6H9l4 4 4-4h-3z"/>
                      </svg>
                    </div>
                    <span>{formatNumber(metrics.likes)}</span>
                  </>
                )}
              </div>
              <div className="flex gap-3 text-gray-500">
                {metrics.comments > 0 && (
                  <span>{formatNumber(metrics.comments)} comments</span>
                )}
                {metrics.shares > 0 && (
                  <span>{formatNumber(metrics.shares)} shares</span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-1">
            <button 
              onClick={() => handleMetricClick('likes')}
              className="flex items-center justify-center flex-1 py-2 hover:bg-gray-50 rounded-md"
            >
              <HeartIcon className="h-6 w-6 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500 font-medium">Like</span>
            </button>
            <button 
              onClick={() => handleMetricClick('comments')}
              className="flex items-center justify-center flex-1 py-2 hover:bg-gray-50 rounded-md"
            >
              <ChatBubbleOvalLeftIcon className="h-6 w-6 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500 font-medium">Comment</span>
            </button>
            <button 
              onClick={() => handleMetricClick('shares')}
              className="flex items-center justify-center flex-1 py-2 hover:bg-gray-50 rounded-md"
            >
              <svg 
                className="h-6 w-6 text-gray-500 mr-2" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 2L19 9L12 16M19 9H5M19 15V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V9" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-gray-500 font-medium">Share</span>
            </button>
          </div>
        </div>
      );

    case "tiktok":
      return (
        <div className="tiktok-style border rounded-lg bg-black max-w-[400px] mx-auto aspect-[9/16] relative overflow-hidden">
          {/* Video/Image Container */}
          {previewMedia.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              {previewMedia[currentMediaIndex].type === 'video' ? (
                <video
                  src={previewMedia[currentMediaIndex].url}
                  className="w-full h-auto max-h-full object-contain"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <Image 
                  src={previewMedia[currentMediaIndex].url}
                  alt={`Preview ${currentMediaIndex + 1}`}
                  className="w-full h-auto max-h-full object-contain"
                  width={400}
                  height={300}
                />
              )}
            </div>
          )}

          {/* TikTok UI Overlay */}
          <div className="absolute inset-0 flex pointer-events-none">
            {/* Left side - Main content */}
            <div className="flex-1 flex flex-col justify-end p-4">
              {/* Username and description */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-white font-semibold text-lg mr-1">@{brandName}</span>
                  {isVerified && (
                    <svg className="w-4 h-4 text-[#20D5EC]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"/>
                    </svg>
                  )}
                </div>
                {/* Caption Editor */}
                <div className="relative text-white text-sm mb-2 pointer-events-auto">
                  <textarea
                    value={postCopy}
                    onChange={handleInput}
                    placeholder="Add a caption..."
                    className="w-full bg-transparent text-white placeholder-gray-400 resize-none border-none focus:outline-none focus:ring-0"
                    rows={2}
                  />
                  <div 
                    className="absolute top-0 left-0 right-0 pointer-events-none text-white"
                    style={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {postCopy.split(/(\s+)/).map((part, index) => (
                      <span 
                        key={index} 
                        className={part.startsWith('#') ? 'font-bold text-white' : 'text-transparent'}
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="w-20 flex flex-col items-center justify-end pb-8 space-y-4">
              {/* Like button */}
              <div className="flex flex-col items-center">
                <button 
                  onClick={() => handleMetricClick('likes')}
                  className="text-white mb-1 pointer-events-auto"
                >
                  <HeartIcon className={`w-8 h-8 ${metrics.likes > 0 ? 'fill-[#FE2C55]' : ''}`} />
                </button>
                <span className="text-white text-xs font-semibold">
                  {formatNumber(metrics.likes)}
                </span>
              </div>

              {/* Comments */}
              <div className="flex flex-col items-center">
                <button 
                  onClick={() => handleMetricClick('comments')}
                  className="text-white mb-1 pointer-events-auto"
                >
                  <ChatBubbleOvalLeftIcon className="w-8 h-8" />
                </button>
                <span className="text-white text-xs font-semibold">
                  {formatNumber(metrics.comments)}
                </span>
              </div>

              {/* Bookmark */}
              <div className="flex flex-col items-center">
                <button 
                  onClick={() => handleMetricClick('bookmarks')}
                  className="text-white mb-1 pointer-events-auto"
                >
                  <BookmarkIcon className={`w-8 h-8 ${metrics.bookmarks ? 'fill-white' : ''}`} />
                </button>
                <span className="text-white text-xs font-semibold">
                  {formatNumber(metrics.bookmarks || 0)}
                </span>
              </div>

              {/* Share */}
              <div className="flex flex-col items-center">
                <button 
                  onClick={() => handleMetricClick('shares')}
                  className="text-white mb-1 pointer-events-auto"
                >
                  <PaperAirplaneIcon className="w-8 h-8" />
                </button>
                <span className="text-white text-xs font-semibold">
                  {formatNumber(metrics.shares)}
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case "x":
      return (
        <div className="x-style border rounded-lg p-4 bg-white shadow-md max-w-[500px] mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex">
              {profileImage ? (
                <Image 
                  src={profileImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3" />
              )}
              <div>
                <div className="flex items-center">
                  <span className="font-bold mr-1">{brandName}</span>
                  {isVerified && (
                    <svg className="w-4 h-4 text-[#1D9BF0]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                    </svg>
                  )}
                  <span className="text-gray-500 ml-1">@{brandName.toLowerCase()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Post Text */}
          <div className="text-[15px] mb-3 whitespace-pre-wrap">
            <div className="relative">
              <textarea
                value={postCopy}
                onChange={handleInput}
                placeholder="What's happening?"
                className="w-full bg-transparent text-gray-900 placeholder-gray-500 resize-none border-none focus:outline-none focus:ring-0 p-0"
                style={{
                  minHeight: '50px'
                }}
              />
            </div>
          </div>

          {/* Media Content */}
          {previewMedia.length > 0 && (
            <div className={`relative rounded-2xl overflow-hidden mb-3 ${
              previewMedia.length === 1 ? '' :
              previewMedia.length === 2 ? 'grid grid-cols-2 gap-0.5' :
              previewMedia.length === 3 ? 'grid grid-cols-2 gap-0.5' :
              'grid grid-cols-2 gap-0.5'
            }`}>
              {previewMedia.slice(0, 4).map((media, index) => {
                const isLarge = previewMedia.length === 3 && index === 0;
                return (
                  <div
                    key={index}
                    className={`${
                      isLarge ? 'col-span-2' : ''
                    } relative ${previewMedia.length > 1 ? 'aspect-square' : 'aspect-video'}`}
                  >
                    {media.type === 'video' ? (
                      <video
                        src={media.url}
                        className="w-full h-full object-cover"
                        controls
                        title={`Preview ${index + 1}`}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={media.url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={300}
                        height={300}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Engagement Stats */}
          <div className="flex items-center justify-between py-3 text-gray-500 border-t border-gray-100">
            <button 
              onClick={() => handleMetricClick('comments')}
              className="flex items-center group hover:text-[#1D9BF0]"
            >
              <div className="p-2 rounded-full group-hover:bg-[#1D9BF0]/10">
                <ChatBubbleOvalLeftIcon className="h-5 w-5" />
              </div>
              <span className="ml-1 text-sm">{formatNumber(metrics.comments)}</span>
            </button>

            <button 
              onClick={() => handleMetricClick('shares')}
              className="flex items-center group hover:text-[#00BA7C]"
            >
              <div className="p-2 rounded-full group-hover:bg-[#00BA7C]/10">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                  />
                </svg>
              </div>
              <span className="ml-1 text-sm text-gray-900">{formatNumber(metrics.shares)}</span>
            </button>

            <button 
              onClick={() => handleMetricClick('likes')}
              className={`flex items-center group ${metrics.likes > 0 ? 'text-[#F91880]' : 'hover:text-[#F91880]'}`}
            >
              <div className="p-2 rounded-full group-hover:bg-[#F91880]/10">
                <HeartIcon className={`h-5 w-5 ${metrics.likes > 0 ? 'fill-current' : ''}`} />
              </div>
              <span className="ml-1 text-sm text-gray-900">{formatNumber(metrics.likes)}</span>
            </button>

            <button className="group flex items-center">
              <PaperAirplaneIcon className="h-6 w-6 group-hover:text-gray-900" />
            </button>
          </div>
        </div>
      );

    case "threads":
      return (
        <div className="threads-style border rounded-lg p-4 bg-white shadow-md max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {profileImage ? (
                <Image 
                  src={profileImage}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full mr-2"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-300 mr-2" />
              )}
              <div className="flex items-center">
                <span className="font-semibold text-sm mr-1">{brandName}</span>
                {isVerified && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000000">
                    <path d="M17.03 9.78a.75.75 0 00-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 00-1.06 1.06l3 3c.29.29.77.29 1.06 0l6-6z" />
                    <path fillRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Post Text */}
          <div className="mb-3">
            <div className="relative">
              <textarea
                value={postCopy}
                onChange={handleInput}
                placeholder="Start a thread..."
                className="w-full bg-transparent text-[15px] placeholder-gray-500 resize-none border-none focus:outline-none focus:ring-0 p-0"
                style={{
                  minHeight: '24px'
                }}
              />
            </div>
          </div>

          {/* Media Content */}
          {previewMedia.length > 0 && (
            <div className="relative mb-4">
              <div className={`grid ${
                previewMedia.length === 1 ? 'grid-cols-1' :
                'grid-cols-2 gap-1'
              }`}>
                {previewMedia.slice(0, 4).map((media, index) => (
                  <div 
                    key={index}
                    className={`relative rounded-md overflow-hidden ${
                      previewMedia.length === 1 ? 'aspect-[4/5]' : 'aspect-square'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <video
                        src={media.url}
                        className="w-full h-full object-cover"
                        controls
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={media.url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={300}
                        height={300}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engagement Stats */}
          <div className="flex items-center space-x-4 text-gray-500">
            <button 
              onClick={() => handleMetricClick('likes')}
              className="group flex items-center"
            >
              <HeartIcon 
                className={`h-6 w-6 ${
                  metrics.likes > 0 
                    ? 'fill-red-500 text-red-500' 
                    : 'group-hover:text-red-500'
                }`} 
              />
              {metrics.likes > 0 && (
                <span className="ml-1 text-sm text-gray-900">
                  {formatNumber(metrics.likes)}
                </span>
              )}
            </button>

            <button 
              onClick={() => handleMetricClick('comments')}
              className="group flex items-center"
            >
              <ChatBubbleOvalLeftIcon className="h-6 w-6 group-hover:text-gray-900" />
              {metrics.comments > 0 && (
                <span className="ml-1 text-sm text-gray-900">
                  {formatNumber(metrics.comments)}
                </span>
              )}
            </button>

            <button 
              onClick={() => handleMetricClick('shares')}
              className="group flex items-center"
            >
              <PaperAirplaneIcon className="h-6 w-6 group-hover:text-gray-900" />
              {metrics.shares > 0 && (
                <span className="ml-1 text-sm text-gray-900">
                  {formatNumber(metrics.shares)}
                </span>
              )}
            </button>

            <button 
              onClick={() => handleMetricClick('bookmarks')}
              className="group flex items-center"
            >
              <BookmarkIcon className={`h-6 w-6 ${
                metrics.bookmarks && metrics.bookmarks > 0
                  ? 'fill-black text-black'
                  : 'group-hover:text-gray-900'
              }`} />
            </button>
          </div>
        </div>
      );

    case "linkedin":
      return (
        <div className="linkedin-style border rounded-lg p-4 bg-white shadow-md max-w-[500px] mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex">
              {profileImage ? (
                <Image 
                  src={profileImage}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full mr-3"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-3" />
              )}
              <div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="font-semibold mr-1">{brandName}</span>
                    {isVerified && (
                      <svg className="w-4 h-4 text-[#0A66C2]" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.5 4.5L6 12 2.5 8.5 1 10l5 5 9-9z"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">Company • Technology</span>
                  <div className="flex items-center text-xs text-gray-500 mt-0.5">
                    <span>1w •</span>
                    <svg className="w-3 h-3 ml-1" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"/>
                      <path d="M9 4H7v5h5V7H9V4z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <button className="text-gray-500 hover:bg-gray-100 rounded-full p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>

          {/* Post Text */}
          <div className="mb-4">
            <div className="relative">
              <textarea
                value={postCopy}
                onChange={handleInput}
                placeholder="What do you want to talk about?"
                className="w-full bg-transparent text-[15px] placeholder-gray-500 resize-none border-none focus:outline-none focus:ring-0 p-0"
                style={{
                  minHeight: '60px'
                }}
              />
            </div>
          </div>

          {/* Media Content */}
          {previewMedia.length > 0 && (
            <div className="relative mb-4 rounded-lg overflow-hidden">
              {previewMedia[currentMediaIndex].type === 'video' ? (
                <video
                  src={previewMedia[currentMediaIndex].url}
                  className="w-full h-full object-cover"
                  controls
                  title={`Preview ${currentMediaIndex + 1}`}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={previewMedia[currentMediaIndex].url}
                  alt={`Preview ${currentMediaIndex + 1}`}
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              )}
              {previewMedia.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {previewMedia.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentMediaIndex 
                          ? 'bg-white' 
                          : 'bg-white/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Engagement Stats */}
          {(metrics.likes > 0 || metrics.comments > 0 || metrics.reactions.length > 0) && (
            <div className="flex items-center justify-between text-sm text-gray-500 pb-3 border-b">
              <div className="flex items-center gap-2">
                {metrics.reactions.length > 0 && (
                  <div className="flex items-center">
                    <div className="flex -space-x-1">
                      {(metrics.reactions as LinkedInReactionType[]).map((reaction, index) => (
                        <div 
                          key={reaction} 
                          className="relative" 
                          style={{ zIndex: 30 - index }}
                        >
                          <div 
                            className="w-[18px] h-[18px] rounded-full flex items-center justify-center ring-2 ring-white"
                            style={{ backgroundColor: reactionColors[reaction] }}
                          >
                            {reaction === 'like' && (
                              <svg className="w-[10px] h-[10px] text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 01-.46 2.85L6.7 9.91a5.1 5.1 0 00-.17 4.65l.29.75A4 4 0 0010.48 17h2.25a3.47 3.47 0 01.41 0l.4.07a2.78 2.78 0 002.73-.91l3.91-4.87a1 1 0 00-.72-1.29z"/>
                              </svg>
                            )}
                            {reaction === 'celebrate' && <span className="text-[10px] leading-none text-white">🎉</span>}
                            {reaction === 'support' && <span className="text-[10px] leading-none text-white">💪</span>}
                            {reaction === 'love' && <span className="text-[10px] leading-none text-white">❤️</span>}
                            {reaction === 'insightful' && <span className="text-[10px] leading-none text-white">💡</span>}
                            {reaction === 'funny' && <span className="text-[10px] leading-none text-white">😄</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <span className="ml-2">{formatNumber(metrics.likes)}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3 text-gray-500">
                {metrics.comments > 0 && (
                  <span>{formatNumber(metrics.comments)} comments</span>
                )}
                {metrics.shares > 0 && (
                  <span>{formatNumber(metrics.shares)} reposts</span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3">
            <button 
              onClick={() => handleMetricClick('likes')}
              className="flex items-center group px-2 py-1 hover:bg-gray-100 rounded"
            >
              <svg 
                className={`w-5 h-5 mr-2 ${
                  metrics.likes > 0 ? 'text-[#0A66C2]' : 'text-gray-500 group-hover:text-[#0A66C2]'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span className={`text-sm font-medium ${
                metrics.likes > 0 ? 'text-[#0A66C2]' : 'text-gray-500 group-hover:text-[#0A66C2]'
              }`}>Like</span>
            </button>

            <button 
              onClick={() => handleMetricClick('comments')}
              className="flex items-center group px-2 py-1 hover:bg-gray-100 rounded"
            >
              <ChatBubbleOvalLeftIcon className="w-5 h-5 mr-2 text-gray-500 group-hover:text-gray-700" />
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Comment</span>
            </button>

            <button 
              onClick={() => handleMetricClick('shares')}
              className="flex items-center group px-2 py-1 hover:bg-gray-100 rounded"
            >
              <svg 
                className="w-5 h-5 mr-2 text-gray-500 group-hover:text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Repost</span>
            </button>

            <button 
              className="flex items-center group px-2 py-1 hover:bg-gray-100 rounded"
            >
              <PaperAirplaneIcon className="w-5 h-5 mr-2 text-gray-500 group-hover:text-gray-700" />
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Send</span>
            </button>
          </div>
        </div>
      );

    case "pinterest":
      return (
        <div className="pinterest-style max-w-[380px] mx-auto">
          {/* Main Pin Container */}
          <div className="relative group rounded-2xl overflow-hidden bg-white shadow-md">
            {/* Media Content */}
            {previewMedia.length > 0 && (
              <div className="relative aspect-[2/3] bg-gray-100">
                {previewMedia[currentMediaIndex].type === 'video' ? (
                  <video
                    src={previewMedia[currentMediaIndex].url}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={previewMedia[currentMediaIndex].url}
                    alt={`Pin preview ${currentMediaIndex + 1}`}
                    className="w-full h-full object-cover"
                    width={380}
                    height={253}
                  />
                )}
                
                {/* Multiple Media Indicator */}
                {previewMedia.length > 1 && (
                  <>
                    <div className="absolute top-4 right-4 bg-black/75 rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium">
                        {currentMediaIndex + 1}/{previewMedia.length}
                      </span>
                    </div>
                    
                    {/* Navigation Buttons */}
                    <button
                      onClick={() => setCurrentMediaIndex(prev => 
                        prev === 0 ? previewMedia.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Previous image"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentMediaIndex(prev => 
                        prev === previewMedia.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Next image"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Save Button */}
                  <button 
                    onClick={() => handleMetricClick('bookmarks')}
                    className="absolute top-4 left-4 bg-[#E60023] hover:bg-[#ad081b] text-white px-4 py-2 rounded-full font-semibold transition-colors"
                  >
                    Save
                  </button>
                  
                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button 
                      onClick={() => handleMetricClick('shares')}
                      className="bg-gray-100 hover:bg-gray-200 rounded-full p-3 transition-colors"
                      aria-label="Share"
                    >
                      <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                    <button 
                      className="bg-gray-100 hover:bg-gray-200 rounded-full p-3 transition-colors"
                      aria-label="More options"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Pin Details */}
            <div className="p-4">
              {/* Profile and Stats Section */}
              <div className="flex flex-col">
                {/* Brand Name and Follow Button */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    {profileImage ? (
                      <Image 
                        src={profileImage} 
                        alt={brandName} 
                        className="w-8 h-8 rounded-full mr-2"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-2" />
                    )}
                    <span className="font-semibold">{brandName}</span>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full font-semibold">
                    Follow
                  </button>
                </div>

                {/* Follower Count */}
                <MetricPopover
                  metric="Followers"
                  value={metrics.followers || 0}
                  onValueChange={(value) => setMetrics(prev => ({ ...prev, followers: value }))}
                />

                {/* Pin Description */}
                <div className="mt-3">
                  <textarea
                    value={postCopy}
                    onChange={handleInput}
                    placeholder="Add your pin description"
                    className="w-full bg-transparent text-[16px] placeholder-gray-500 resize-none border-none focus:outline-none focus:ring-0 p-0"
                    style={{
                      minHeight: '48px'
                    }}
                  />
                </div>

                {/* Credit/Source Link */}
                <div className="mt-2 text-sm text-gray-500">
                  {postCopy.includes('@') && (
                    <span>Credit: {
                      postCopy.match(/@(\w+)/)?.[0] || '@username'
                    }</span>
                  )}
                </div>

                {/* Bottom Action Bar */}
                <div className="mt-4 flex items-center justify-between">
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Comments"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Share"
                  >
                    <PaperAirplaneIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Pins Hint */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">More like this</span>
          </div>
        </div>
      );

    // Add all other cases with their respective content
    // ...

    default:
      return null;
  }
}

// Move formatNumber outside of PlatformSpecificUI
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

function MainContent({ selectedPlatform, previewMedia, setPreviewMedia, currentMediaIndex, setCurrentMediaIndex, postCopy, setPostCopy, brandName, profileImage, isVerified, metrics, setMetrics }: MainContentProps & { 
  metrics: SocialMetrics;
  setMetrics: React.Dispatch<React.SetStateAction<SocialMetrics>>;
}) {
  const mockupRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleExport = async () => {
    if (!mockupRef.current || !previewMedia.length) {
      toast({
        title: "Nothing to export",
        description: "Please add an image first",
        variant: "destructive",
      });
      return;
    }

    try {
      const canvas = await html2canvas(mockupRef.current, {
        scale: 3, // Increased scale for better quality
        useCORS: true, // Enable cross-origin image loading
        allowTaint: true, // Allow cross-origin images
        backgroundColor: '#FFFFFF',
        logging: false,
        imageTimeout: 0, // Remove timeout for image loading
      });

      // Convert to blob with maximum quality
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error('Canvas to Blob conversion failed');
          }

          // Create download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `${brandName}-social-preview.png`;
          link.href = url;
          link.click();

          // Cleanup
          URL.revokeObjectURL(url);
        },
        'image/png',
        1.0 // Maximum quality
      );

      toast({
        title: "Export successful",
        description: "Your mockup has been downloaded",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your mockup",
        variant: "destructive",
      });
      console.error('Export error:', error);
    }
  };

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload image or video files only",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewMedia(prev => [...prev, {
          url: event.target?.result as string,
          type: file.type.startsWith('image/') ? 'image' : 'video'
        }]);
      };
      reader.readAsDataURL(file);
    });
  }, [toast, setPreviewMedia]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm', '.ogg']
    },
    multiple: true
  });

  return (
    <main className="flex-1 p-4">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" size="icon">
          <Save className="h-4 w-4" />
        </Button>
        <Button onClick={handleExport}>Export</Button>
      </div>

      {previewMedia.length > 0 && (
        <div ref={mockupRef}>
          <PlatformSpecificUI
            platform={selectedPlatform}
            previewMedia={previewMedia}
            currentMediaIndex={currentMediaIndex}
            setCurrentMediaIndex={setCurrentMediaIndex}
            postCopy={postCopy}
            setPostCopy={setPostCopy}
            brandName={brandName}
            profileImage={profileImage}
            isVerified={isVerified}
            metrics={metrics}
            setMetrics={setMetrics}
          />
        </div>
      )}

      <div
        {...getRootProps()}
        className={`relative mt-4 flex min-h-[100px] items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
          isDragActive ? "border-primary" : "border-muted-foreground/25"
        }`}
      >
        <input {...getInputProps()} />
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
      </div>
    </main>
  );
}

export function BlockPage() {
  const [selectedPlatform, setSelectedPlatform] = React.useState(platforms[0].id);
  const [previewMedia, setPreviewMedia] = React.useState<MediaType[]>([]);
  const [currentMediaIndex, setCurrentMediaIndex] = React.useState(0);
  const [postCopy, setPostCopy] = React.useState<string>("");
  const [brandName, setBrandName] = React.useState<string>("brandname");
  const [profileImage, setProfileImage] = React.useState<string | null>(null);
  const [isVerified, setIsVerified] = React.useState<boolean>(true);
  const [metrics, setMetrics] = React.useState<SocialMetrics>({
    likes: 0,
    comments: 0,
    shares: 0,
    bookmarks: 0,
    followers: 0,
    reactions: []
  });

  return (
    <div className="flex h-screen flex-col">
      <TopNavigation />
      <div className="flex flex-1">
        <LeftSidebar />
        <MainContent
          selectedPlatform={selectedPlatform}
          previewMedia={previewMedia}
          setPreviewMedia={setPreviewMedia}
          currentMediaIndex={currentMediaIndex}
          setCurrentMediaIndex={setCurrentMediaIndex}
          postCopy={postCopy}
          setPostCopy={setPostCopy}
          brandName={brandName}
          profileImage={profileImage}
          isVerified={isVerified}
          metrics={metrics}
          setMetrics={setMetrics}
        />
        <RightSidebar
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          brandName={brandName}
          setBrandName={setBrandName}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          isVerified={isVerified}
          setIsVerified={setIsVerified}
        />
      </div>
    </div>
  );
}