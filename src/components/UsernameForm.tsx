"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface UsernameFormProps {
  onGenerate: (username: string, profileImage: string | null) => void;
  isGenerating: boolean;
}

/**
 * Discord username and profile image input form.
 * Gold & brown premium theme with image preview.
 */
export default function UsernameForm({
  onGenerate,
  isGenerating,
}: UsernameFormProps) {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateUsername = (value: string): boolean => {
    if (!value.trim()) {
      setError("Please enter your Discord username");
      return false;
    }
    if (value.length < 2) {
      setError("Username must be at least 2 characters");
      return false;
    }
    if (value.length > 32) {
      setError("Username must be 32 characters or fewer");
      return false;
    }
    setError("");
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUsername(username)) {
      onGenerate(username.trim(), profileImage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (error) setError("");
  };

  return (
    <motion.section
      className="max-w-lg mx-auto px-4 pb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-2xl p-6 glow-hover transition-all duration-300 space-y-5">
          {/* Username Input */}
          <div>
            <label
              htmlFor="discord-username"
              className="block text-sm font-medium text-prismax-gold mb-3 uppercase tracking-wider"
            >
              Discord Username
            </label>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-prismax-muted">
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 24 18"
                  fill="currentColor"
                >
                  <path d="M20.317 1.492a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 1.492.07.07 0 003.64 1.52C.533 6.093-.32 10.555.099 14.961a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                </svg>
              </div>

              <input
                id="discord-username"
                type="text"
                value={username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="input-field pl-11"
                disabled={isGenerating}
                autoComplete="off"
                maxLength={32}
              />
            </div>
          </div>

          {/* Profile Photo Uploader */}
          <div>
            <span className="block text-sm font-medium text-prismax-gold mb-3 uppercase tracking-wider">
              Profile Photo (Optional)
            </span>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              disabled={isGenerating}
            />

            <div
              onClick={triggerFileInput}
              className="border border-dashed border-prismax-gold/20 rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-prismax-gold/40 hover:bg-prismax-gold/5 transition-all duration-300 group"
            >
              {profileImage ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <img
                      src={profileImage}
                      alt="Profile preview"
                      className="w-12 h-12 rounded-full object-cover border border-prismax-gold/40"
                    />
                    <div className="text-left">
                      <p className="text-xs text-prismax-text font-medium">Image Loaded</p>
                      <p className="text-[10px] text-prismax-muted">Ready for banner</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 rounded-lg bg-prismax-brown-dark text-prismax-gold hover:text-prismax-gold-light hover:bg-prismax-brown transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-prismax-gold/10 flex items-center justify-center text-prismax-gold group-hover:scale-105 transition-transform duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-prismax-text font-semibold">Upload profile picture</p>
                    <p className="text-[10px] text-prismax-muted mt-1">JPEG, PNG up to 5MB</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Error message */}
          {error && (
            <motion.p
              className="text-sm mt-2"
              style={{ color: "#C8903C" }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Generate Button */}
        <motion.button
          type="submit"
          className="btn-primary w-full text-lg"
          disabled={isGenerating || !username.trim()}
          whileTap={{ scale: 0.98 }}
          id="generate-banner-btn"
        >
          <span className="flex items-center justify-center gap-3">
            {isGenerating ? (
              <>
                <div className="spinner" />
                Generating...
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                Generate Banner
              </>
            )}
          </span>
        </motion.button>
      </form>
    </motion.section>
  );
}
