'use client'

import { memo, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Camera, 
  Play, 
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'

const Gallery = memo(function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'action', label: 'Action' },
    { id: 'team', label: 'Teams' },
    { id: 'venue', label: 'Venue' },
    { id: 'celebration', label: 'Celebrations' },
  ]

  const images = [
    { src: '/gallery/1.jpg', category: 'action', title: 'Epic Spike' },
    { src: '/gallery/2.jpg', category: 'team', title: 'Team Huddle' },
    { src: '/gallery/3.jpg', category: 'venue', title: 'Stadium View' },
    { src: '/gallery/4.jpg', category: 'celebration', title: 'Victory Moment' },
    { src: '/gallery/5.jpg', category: 'action', title: 'Block Defense' },
    { src: '/gallery/6.jpg', category: 'team', title: 'Team Photo' },
    { src: '/gallery/7.jpg', category: 'action', title: 'Diving Save' },
    { src: '/gallery/8.jpg', category: 'celebration', title: 'Trophy Ceremony' },
  ]

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory)

  return (
    <section ref={ref} id="gallery" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-6 py-2 text-lg bg-pink-500/10 text-pink-400 border-pink-500/30">
            <Camera className="w-4 h-4 mr-2" />
            Gallery
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Captured{' '}
            <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
              Moments
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Relive the excitement from previous tournaments
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center gap-2 mb-8 flex-wrap"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <Card className="bg-gray-800/50 border-gray-700 overflow-hidden group">
                  <CardContent className="p-0 relative">
                    <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-500 group-hover:scale-110 transition-transform" />
                      <motion.div
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <Play className="w-12 h-12 text-white" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-semibold">{image.title}</p>
                      <Badge className="mt-1 text-xs bg-white/20 text-white border-0">
                        {image.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-20 h-20 text-gray-500" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white hover:bg-white/20"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-6 h-6" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
})

export default Gallery