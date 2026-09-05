import React, { useState, useEffect } from 'react';
import { getActiveFeaturesConfig } from '../config/siteConfig';
import FeatureMaintenanceNotice from './FeatureMaintenanceNotice';

/**
 * 🛡️ FeatureGuard Component:
 * Automatically inspects the feature's maintenance state.
 * If active (or admin bypass is on) -> renders children.
 * If under maintenance -> displays dedicated FeatureMaintenanceNotice.
 */
export default function FeatureGuard({ featureId, bypassMaintenance, onBypass, children }) {
  const [featuresConfig, setFeaturesConfig] = useState(getActiveFeaturesConfig());

  useEffect(() => {
    const handleConfigChange = () => {
      setFeaturesConfig(getActiveFeaturesConfig());
    };
    window.addEventListener('naja7i_features_config_changed', handleConfigChange);
    return () => window.removeEventListener('naja7i_features_config_changed', handleConfigChange);
  }, []);

  const feature = featuresConfig[featureId];

  // If the feature is under maintenance and admin has not bypassed it:
  if (feature?.isMaintenance && !bypassMaintenance) {
    return (
      <FeatureMaintenanceNotice 
        feature={feature} 
        onBypass={onBypass} 
      />
    );
  }

  return children;
}
