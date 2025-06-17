# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-06-17

### Added
- 🚀 Initial release of ECharts visualization server
- 📊 Support for 4 chart types: Line, Histogram, Pie, and Map
- 🌐 RESTful API with GET/POST endpoints
- 🎨 Beautiful web interface with responsive design
- 🗺️ China map visualization with GeoJSON data
- 📱 Mobile-friendly design
- 🔧 Comprehensive test suite
- 📚 Complete documentation

### Features
- **Line Charts**: Multi-series support with automatic legend positioning
- **Histograms**: Data distribution visualization with custom categories
- **Pie Charts**: Percentage data with customizable colors
- **Maps**: China provinces with intelligent name mapping
- **API Endpoints**: Both default data (GET) and custom data (POST) support
- **Province Name Mapping**: Automatic conversion from short names to full names
- **Web Interface**: Interactive charts with real-time data editing
- **Test Tools**: Command-line tests and visual test page

### Technical Stack
- Runtime: Bun (high-performance JavaScript runtime)
- Charts: ECharts 5.6.0
- Server: Bun built-in HTTP server
- Frontend: Vanilla HTML/CSS/JavaScript

### Bug Fixes
- ✅ Fixed legend overlap issue in multi-series line charts
- ✅ Fixed map data not displaying due to name mismatch
- ✅ Added automatic province name standardization

### Project Structure
```
echart/
├── src/                  # Source code
├── data/                 # Data files (GeoJSON)
├── public/               # Static files
├── tests/                # Test files
├── scripts/              # Utility scripts
├── docs/                 # Documentation
└── package.json          # Project configuration
```

### API Endpoints
- `GET /` - Main web interface
- `GET /line` - Default line chart
- `GET /histogram` - Default histogram
- `GET /pie` - Default pie chart
- `GET /map` - Default map chart
- `GET /china.json` - China map GeoJSON data
- `POST /line` - Custom line chart
- `POST /histogram` - Custom histogram
- `POST /pie` - Custom pie chart
- `POST /map` - Custom map chart

### Testing
- Command-line test suite
- Visual test page for maps
- Province name mapping validation
- Edge case testing
- API endpoint validation

### Documentation
- Comprehensive README with examples
- API documentation
- Troubleshooting guide
- Data format specifications
- Project setup instructions

### Known Issues
- None at this time

### Breaking Changes
- None (initial release)

### Migration Guide
- N/A (initial release)

### Contributors
- Initial development and implementation

---

## Template for Future Releases

## [Unreleased]

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

---

**Legend:**
- 🚀 New features
- 🔧 Improvements
- 🐛 Bug fixes
- 📚 Documentation
- ⚠️ Breaking changes
- 🔒 Security fixes