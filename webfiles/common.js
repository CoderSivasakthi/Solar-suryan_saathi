        // Function to toggle slope angle input based on roof type
        document.getElementById('roofType').addEventListener('change', function() {
            if (this.value === 'slope') {
                document.getElementById('slopeAngle').style.display = 'block';
                document.getElementById('slopeAngleLabel').style.display = 'block';
            } else {
                document.getElementById('slopeAngle').style.display = 'none';
                document.getElementById('slopeAngleLabel').style.display = 'none';
            }
        });

        // Function to calculate solar energy details
        function calculate() {
            const cost = parseFloat(document.getElementById('cost').value);
            const roofType = document.getElementById('roofType').value;
            const slopeAngle = parseFloat(document.getElementById('slopeAngle').value) || 0;
            const systemSize = parseFloat(document.getElementById('systemSize').value);

            // Constants
            const unitRate = 6; // Approximate rate per unit (₹)
            const sunHours = 4.5; // Average sun hours per day in Tamil Nadu
            const slopeEfficiencyLoss = slopeAngle > 0 ? slopeAngle * 0.01 : 0; // Approximate loss per degree slope
            const avgKWPerDay = systemSize * sunHours * (1 - slopeEfficiencyLoss); // kWh per day

            // Calculate energy consumed based on the bill cost
            const unitsConsumed = cost / unitRate;
            
            // Solar energy production per month (kWh)
            const solarProductionPerMonth = avgKWPerDay * 30;
            
            // Calculate the new bill after solar
            const energySaved = Math.min(unitsConsumed, solarProductionPerMonth);
            const newBill = (unitsConsumed - energySaved) * unitRate;
            
            // Environmental impact (trees saved and CO2 emissions reduced)
            const treesSaved = energySaved * 0.0005; // 1 kWh saves 0.0005 trees
            const co2Saved = energySaved * 0.85; // 1 kWh saves 0.85 kg of CO2

            // Display results
            document.getElementById('unitsConsumed').textContent = `Units Consumed: ${unitsConsumed.toFixed(2)} kWh`;
            document.getElementById('solarProduction').textContent = `Solar Energy Production: ${solarProductionPerMonth.toFixed(2)} kWh per month`;
            document.getElementById('newBill').textContent = `New Electricity Bill: ₹${newBill.toFixed(2)}`;
            document.getElementById('treesSaved').textContent = `Trees Saved: ${treesSaved.toFixed(2)} trees per month`;
            document.getElementById('co2Saved').textContent = `CO₂ Saved: ${co2Saved.toFixed(2)} kg per month`;
        }