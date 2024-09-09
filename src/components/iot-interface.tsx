'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Thermometer, Droplets, Zap, AlertTriangle, Bell, MapPin } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line } from 'recharts'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Sensor {
  id: string
  name: string
  location: string
}

interface AlertData {
  id: string
  type: 'Température' | 'Humidité' | 'Électricité'
  count: number
  threshold: number
  icon: React.ReactNode
  color: string
  sensors: Sensor[]
  address: string
  severity: 'Faible' | 'Modérée' | 'Élevée' | 'Critique'
  description: string
}

interface SensorReading {
  time: string
  temperature: number
  humidity: number
  electricity: number
}

const IoTAlertMonitoring: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [sensorData, setSensorData] = useState<SensorReading[]>([])
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null)

  useEffect(() => {
    const fetchData = () => {
      const newAlerts: AlertData[] = [
        { 
          id: '1',
          type: 'Température', 
          count: Math.floor(Math.random() * 10), 
          threshold: 30, 
          icon: <Thermometer className="h-4 w-4" />, 
          color: 'text-red-500',
          sensors: [
            { id: 'T1', name: 'Capteur Temp 1', location: 'Salle serveur' },
            { id: 'T2', name: 'Capteur Temp 2', location: 'Bureau principal' }
          ],
          address: '123 Rue de l\'Innovation, 75001 Paris',
          severity: 'Élevée',
          description: 'Augmentation rapide de la température dans la salle serveur'
        },
        { 
          id: '2',
          type: 'Humidité', 
          count: Math.floor(Math.random() * 8), 
          threshold: 70, 
          icon: <Droplets className="h-4 w-4" />, 
          color: 'text-blue-500',
          sensors: [
            { id: 'H1', name: 'Capteur Hum 1', location: 'Entrepôt' }
          ],
          address: '456 Avenue de la Technologie, 69002 Lyon',
          severity: 'Modérée',
          description: 'Niveau d\'humidité anormal détecté dans l\'entrepôt'
        },
        { 
          id: '3',
          type: 'Électricité', 
          count: Math.floor(Math.random() * 5), 
          threshold: 220, 
          icon: <Zap className="h-4 w-4" />, 
          color: 'text-yellow-500',
          sensors: [
            { id: 'E1', name: 'Capteur Elec 1', location: 'Panneau électrique principal' },
            { id: 'E2', name: 'Capteur Elec 2', location: 'Salle de conférence' }
          ],
          address: '789 Boulevard de l\'Électronique, 33000 Bordeaux',
          severity: 'Critique',
          description: 'Pic de consommation électrique détecté, risque de surcharge'
        },
      ]
      setAlerts(newAlerts)

      const newSensorData: SensorReading[] = [...Array(24)].map((_, i) => ({
        time: `${i}:00`,
        temperature: 20 + Math.random() * 15,
        humidity: 50 + Math.random() * 30,
        electricity: 200 + Math.random() * 40,
      }))
      setSensorData(newSensorData)
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const getLatestReading = (type: AlertData['type']): string => {
    const latest = sensorData[sensorData.length - 1]
    switch (type) {
      case 'Température': return `${latest.temperature.toFixed(1)}°C`
      case 'Humidité': return `${latest.humidity.toFixed(1)}%`
      case 'Électricité': return `${latest.electricity.toFixed(1)}V`
    }
  }

  const isOverThreshold = (type: AlertData['type']): boolean => {
    const latest = sensorData[sensorData.length - 1]
    const alert = alerts.find(a => a.type === type)
    if (!alert) return false
    switch (type) {
      case 'Température': return latest.temperature > alert.threshold
      case 'Humidité': return latest.humidity > alert.threshold
      case 'Électricité': return latest.electricity > alert.threshold
    }
  }

  const renderAlertCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{alert.type}</CardTitle>
            <div className={`${alert.color}`}>{alert.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alert.count}</div>
            <p className="text-xs text-muted-foreground">Alertes actives</p>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Dernière lecture:</span>
                <span className="font-medium">{getLatestReading(alert.type)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Seuil:</span>
                <span className="font-medium">{alert.threshold}</span>
              </div>
              <Progress value={(parseInt(getLatestReading(alert.type)) / alert.threshold) * 100} className="h-2" />
              {isOverThreshold(alert.type) && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Attention</AlertTitle>
                  <AlertDescription>Valeur au-dessus du seuil</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderAlertChart = () => (
    <Card>
      <CardHeader>
        <CardTitle>Répartition des Alertes</CardTitle>
        <CardDescription>Vue d'ensemble des alertes par type de capteur</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={alerts}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const renderSensorHistory = () => (
    <Card>
      <CardHeader>
        <CardTitle>Historique des données des capteurs (24h)</CardTitle>
        <CardDescription>Évolution des mesures sur les dernières 24 heures</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={sensorData}>
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#ff7300" name="Température" />
            <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#8884d8" name="Humidité" />
            <Line yAxisId="right" type="monotone" dataKey="electricity" stroke="#82ca9d" name="Électricité" />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const renderAlertDetails = (alert: AlertData) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Détails
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Détails de l'alerte : {alert.type}</DialogTitle>
          <DialogDescription>Informations détaillées sur l'alerte</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Statut</h4>
            <Badge variant={isOverThreshold(alert.type) ? "destructive" : "secondary"}>
              {isOverThreshold(alert.type) ? "Critique" : "Normal"}
            </Badge>
          </div>
          <div>
            <h4 className="font-medium">Dernière lecture</h4>
            <p>{getLatestReading(alert.type)}</p>
          </div>
          <div>
            <h4 className="font-medium">Seuil</h4>
            <p>{alert.threshold}</p>
          </div>
          <div>
            <h4 className="font-medium">Gravité</h4>
            <Badge variant={alert.severity === 'Critique' ? "destructive" : "secondary"}>
              {alert.severity}
            </Badge>
          </div>
          <div>
            <h4 className="font-medium">Description</h4>
            <p>{alert.description}</p>
          </div>
          <div>
            <h4 className="font-medium">Adresse</h4>
            <p className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {alert.address}</p>
          </div>
          <div>
            <h4 className="font-medium">Capteurs concernés</h4>
            <ul className="list-disc list-inside">
              {alert.sensors.map(sensor => (
                <li key={sensor.id}>{sensor.name} - {sensor.location}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Recommandations</h4>
            <ul className="list-disc list-inside">
              <li>Vérifier les capteurs pour s'assurer de leur bon fonctionnement</li>
              <li>Inspecter la zone concernée pour identifier d'éventuelles anomalies</li>
              <li>Ajuster les paramètres de contrôle si nécessaire</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Monitoring des Alertes IoT</h2>
        <Button variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          Configurer les alertes
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {renderAlertCards()}
          {renderAlertChart()}
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          {renderAlertCards()}
          <Card>
            <CardHeader>
              <CardTitle>Détails des Alertes</CardTitle>
              <CardDescription>Informations détaillées sur les alertes actives</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Type</th>
                    <th className="text-left">Nombre</th>
                    <th className="text-left">Statut</th>
                    <th className="text-left">Gravité</th>
                    <th className="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => (
                    <tr key={alert.id} className="border-t">
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div className={`${alert.color}`}>{alert.icon}</div>
                          {alert.type}
                        </div>
                      </td>
                      <td className="py-2">{alert.count}</td>
                      <td className="py-2">
                        <Badge variant={isOverThreshold(alert.type) ? "destructive" : "secondary"}>
                          {isOverThreshold(alert.type) ? "Critique" : "Normal"}
                        </Badge>
                      </td>
                      <td className="py-2">
                        <Badge variant={alert.severity === 'Critique' ? "destructive" : "secondary"}>
                          {alert.severity}
                        </Badge>
                      </td>
                      <td className="py-2">
                        {renderAlertDetails(alert)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
                      <TabsContent value="history">
                      {renderSensorHistory()}
                      </TabsContent>
                      </Tabs>

                      {selectedAlert && (
                      <Card>
                      <CardHeader>
                      <CardTitle>Détails de l'alerte : {selectedAlert.type}</CardTitle>
                      <CardDescription>Informations détaillées et recommandations</CardDescription>
                      </CardHeader>
                      <CardContent>
                      <div className="space-y-4">
                      <div>
                      <h4 className="font-medium">Statut actuel</h4>
                      <p>{isOverThreshold(selectedAlert.type) ? "Au-dessus du seuil" : "Normal"}</p>
                      </div>
                      <div>
                      <h4 className="font-medium">Dernière lecture</h4>
                      <p>{getLatestReading(selectedAlert.type)}</p>
                      </div>
                      <div>
                      <h4 className="font-medium">Seuil</h4>
                      <p>{selectedAlert.threshold}</p>
                      </div>
                      <div>
                      <h4 className="font-medium">Gravité</h4>
                      <Badge variant={selectedAlert.severity === 'Critique' ? "destructive" : "secondary"}>
                      {selectedAlert.severity}
                      </Badge>
                      </div>
                      <div>
                      <h4 className="font-medium">Description</h4>
                      <p>{selectedAlert.description}</p>
                      </div>
                      <div>
                      <h4 className="font-medium">Adresse</h4>
                      <p className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {selectedAlert.address}</p>
                      </div>
                      <div>
                      <h4 className="font-medium">Capteurs concernés</h4>
                      <ul className="list-disc list-inside">
                      {selectedAlert.sensors.map(sensor => (
                      <li key={sensor.id}>{sensor.name} - {sensor.location}</li>
                      ))}
                      </ul>
                      </div>
                      <div>
                      <h4 className="font-medium">Recommandations</h4>
                      <ul className="list-disc list-inside">
                      <li>Vérifier les capteurs pour s'assurer de leur bon fonctionnement</li>
                      <li>Inspecter la zone concernée pour identifier d'éventuelles anomalies</li>
                      <li>Ajuster les paramètres de contrôle si nécessaire</li>
                      </ul>
                      </div>
                      <Button className="w-full" onClick={() => setSelectedAlert(null)}>
                      Fermer les détails
                      </Button>
                      </div>
                      </CardContent>
                      </Card>
                      )}
                      </div>
                      )
                      }

                      export default IoTAlertMonitoring