import { cn } from "@/lib/utils"
import { MapPin, Clock } from "lucide-react"

interface ContactInfoProps {
  address: string
  city: string
  postalCode: string
  contactName?: string
  contactTitle?: string
  phone?: string
  email?: string
  hours?: string[]
  className?: string
}

export function ContactInfo({
  address,
  city,
  postalCode,
  contactName,
  contactTitle,
  phone,
  email,
  hours,
  className,
}: ContactInfoProps) {
  return (
    <div className={cn("bg-[#111] p-6 rounded-lg border border-gray-800", className)}>
      <h3 className="font-bold mb-4 text-white">Get in touch</h3>
      <p className="text-sm mb-4 text-white">
        {address}
        <br />
        {city}, {postalCode}
      </p>

      {(contactName || contactTitle || phone || email) && (
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-[#222] p-2 rounded-full">
            <MapPin className="h-5 w-5 text-[#ffb800]" />
          </div>
          <div>
            {contactTitle && <p className="font-semibold text-white">{contactTitle}</p>}
            {contactName && <p className="text-sm text-white">{contactName}</p>}
            {phone && <p className="text-sm text-white">{phone}</p>}
            {email && <p className="text-sm text-[#ffb800] font-semibold">{email}</p>}
          </div>
        </div>
      )}

      {hours && hours.length > 0 && (
        <div className="flex items-start gap-4">
          <div className="bg-[#222] p-2 rounded-full">
            <Clock className="h-5 w-5 text-[#ffb800]" />
          </div>
          <div>
            {hours.map((hour, index) => (
              <p key={index} className="text-sm text-white">
                {hour}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

