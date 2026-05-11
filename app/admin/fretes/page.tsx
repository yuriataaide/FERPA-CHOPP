"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Truck, 
  MapPin, 
  DollarSign,
  Save,
  Plus,
  Trash2
} from "lucide-react"

interface FreightZone {
  id: string
  name: string
  cepRange: string
  basePrice: number
  pricePerKm: number
  active: boolean
}

export default function AdminFreightPage() {
  const [zones, setZones] = useState<FreightZone[]>([
    {
      id: "1",
      name: "Porto Alegre - Centro",
      cepRange: "90000-000 a 90999-999",
      basePrice: 25.00,
      pricePerKm: 2.50,
      active: true
    },
    {
      id: "2",
      name: "Porto Alegre - Zonas",
      cepRange: "91000-000 a 91999-999",
      basePrice: 35.00,
      pricePerKm: 3.00,
      active: true
    },
    {
      id: "3",
      name: "Região Metropolitana",
      cepRange: "92000-000 a 94999-999",
      basePrice: 50.00,
      pricePerKm: 3.50,
      active: true
    },
    {
      id: "4",
      name: "Interior RS",
      cepRange: "95000-000 a 99999-999",
      basePrice: 80.00,
      pricePerKm: 4.00,
      active: false
    }
  ])

  const [generalSettings, setGeneralSettings] = useState({
    freeShippingMin: 500,
    urgentDeliveryFee: 50,
    pickupDiscount: 10,
    maxDistance: 150
  })

  const toggleZone = (id: string) => {
    setZones(zones.map(zone => 
      zone.id === id ? { ...zone, active: !zone.active } : zone
    ))
  }

  const deleteZone = (id: string) => {
    setZones(zones.filter(zone => zone.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Configuração de Fretes</h1>
        <p className="text-muted-foreground">Gerencie zonas de entrega e valores</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Configurações Gerais
          </CardTitle>
          <CardDescription>
            Defina regras gerais para cálculo de frete
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="freeShipping">Frete grátis acima de (R$)</Label>
              <Input
                id="freeShipping"
                type="number"
                value={generalSettings.freeShippingMin}
                onChange={(e) => setGeneralSettings(s => ({ ...s, freeShippingMin: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgentFee">Taxa entrega urgente (R$)</Label>
              <Input
                id="urgentFee"
                type="number"
                value={generalSettings.urgentDeliveryFee}
                onChange={(e) => setGeneralSettings(s => ({ ...s, urgentDeliveryFee: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickupDiscount">Desconto retirada no local (%)</Label>
              <Input
                id="pickupDiscount"
                type="number"
                value={generalSettings.pickupDiscount}
                onChange={(e) => setGeneralSettings(s => ({ ...s, pickupDiscount: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxDistance">Distância máxima (km)</Label>
              <Input
                id="maxDistance"
                type="number"
                value={generalSettings.maxDistance}
                onChange={(e) => setGeneralSettings(s => ({ ...s, maxDistance: Number(e.target.value) }))}
              />
            </div>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </CardContent>
      </Card>

      {/* Delivery Zones */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Zonas de Entrega
              </CardTitle>
              <CardDescription>
                Configure preços por região
              </CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Zona
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {zones.map((zone) => (
              <div 
                key={zone.id}
                className={`p-4 rounded-lg border ${zone.active ? 'bg-background' : 'bg-muted/50'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${zone.active ? 'bg-primary/10' : 'bg-muted'}`}>
                      <Truck className={`h-5 w-5 ${zone.active ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="font-medium">{zone.name}</p>
                      <p className="text-sm text-muted-foreground">{zone.cepRange}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Base</p>
                      <p className="font-medium">R$ {zone.basePrice.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Por km</p>
                      <p className="font-medium">R$ {zone.pricePerKm.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={zone.active}
                        onCheckedChange={() => toggleZone(zone.id)}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteZone(zone.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Types */}
      <Card>
        <CardHeader>
          <CardTitle>Tipos de Entrega</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Entrega Padrão</p>
                <p className="text-sm text-muted-foreground">1-2 dias úteis</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Entrega Urgente</p>
                <p className="text-sm text-muted-foreground">No mesmo dia (+R$ 50,00)</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Retirada no Local</p>
                <p className="text-sm text-muted-foreground">Desconto de 10%</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
