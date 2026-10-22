import React, { useEffect } from 'react';
import { ProjectRecord } from '../config/siteConfig';
import { X, MapPin, Building, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectRecord | null;
  onClose: () => void;
  onEnquire: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onEnquire,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy/90 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col text-navy border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-navy/80 hover:bg-navy text-white flex items-center justify-center transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-olive"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Hero Image in Modal */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-navy overflow-hidden">
          <img
            src={project.mainImage}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:left-8 text-white pr-16">
            <span className="text-xs font-mono uppercase tracking-widest text-olive-light block mb-1">
              {project.localityBadge}
            </span>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold uppercase font-display">
              {project.name}
            </h2>
          </div>
        </div>

        {/* Modal Details Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Key Specs Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-spark-lightGrey rounded-2xl border border-gray-200 text-sm">
            <div>
              <span className="text-[0.68rem] uppercase font-mono text-mutedText block">
                Type
              </span>
              <span className="font-semibold text-navy mt-1 block">
                {project.propertyType}
              </span>
            </div>
            <div>
              <span className="text-[0.68rem] uppercase font-mono text-mutedText block">
                Configuration
              </span>
              <span className="font-semibold text-navy mt-1 block">
                {project.configuration}
              </span>
            </div>
            <div>
              <span className="text-[0.68rem] uppercase font-mono text-mutedText block">
                Starting Value
              </span>
              <span className="font-bold text-olive mt-1 block">
                {project.startingPrice}
              </span>
            </div>
            <div>
              <span className="text-[0.68rem] uppercase font-mono text-mutedText block">
                Status
              </span>
              <span className="font-semibold text-navy mt-1 flex items-center gap-1">
                <CheckCircle2 size={13} className="text-olive" /> Verified
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-mutedText mb-2">
              Architectural Overview
            </h4>
            <p className="text-darkText text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Gallery Thumbnails */}
          {project.galleryImages.length > 1 && (
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-mutedText mb-3">
                Project Gallery
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.galleryImages.map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={img} alt={`${project.name} photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location & CTA */}
          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-mutedText">
              <MapPin size={16} className="text-olive shrink-0" />
              <span>{project.location}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border border-gray-300 text-navy hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onEnquire();
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Enquire About Project</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
