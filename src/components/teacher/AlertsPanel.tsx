import { Alert as AlertType } from '@/types/learning';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  TrendingDown, 
  Trophy,
  Sparkles,
  ChevronRight,
  Clock
} from 'lucide-react';

interface AlertsPanelProps {
  alerts: AlertType[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const getAlertIcon = (type: string, severity: string) => {
    if (type === 'achievement') return <Trophy className="w-5 h-5 text-success" />;
    if (severity === 'high') return <AlertTriangle className="w-5 h-5 text-destructive" />;
    return <TrendingDown className="w-5 h-5 text-warning" />;
  };

  const getAlertBorderColor = (type: string, severity: string) => {
    if (type === 'achievement') return 'border-l-success';
    if (severity === 'high') return 'border-l-destructive';
    if (severity === 'medium') return 'border-l-warning';
    return 'border-l-info';
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'high': return 'riskHigh';
      case 'medium': return 'riskModerate';
      case 'low': return 'riskLow';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">
          Recent Alerts
        </h3>
        <Badge variant="secondary">
          {alerts.length} alerts
        </Badge>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card 
            key={alert.id}
            className={`p-4 border-l-4 ${getAlertBorderColor(alert.type, alert.severity)} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                alert.type === 'achievement' ? 'bg-success/10' :
                alert.severity === 'high' ? 'bg-destructive/10' : 'bg-warning/10'
              }`}>
                {getAlertIcon(alert.type, alert.severity)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-medium text-foreground">
                    {alert.studentName}
                  </span>
                  <Badge variant={getSeverityVariant(alert.severity)} className="capitalize">
                    {alert.severity} Priority
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {alert.message}
                </p>

                {alert.aiSuggestion && (
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-primary">AI Suggestion</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {alert.aiSuggestion}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {alert.timestamp}
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    View Details
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
