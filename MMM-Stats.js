Module.register("MMM-Stats", {

    defaults: {
		updateInterval: 60 * 60 * 1000, // ms (1 hour)
		counters : [
			{ label: "{0} day(s) since last incident", startDate: "2001-01-01" },
		]
	  },
	
	  start: function() {
		let self = this;
		setInterval(function() {
			self.updateDom(); // no speed defined, so it updates instantly.
		}, this.config.updateInterval);
	},

	  getDaysSince: function(startDate) {
		const start = new Date(startDate); // Parse the start date
		const now = new Date(); // Get the current date
		const diffTime = Math.abs(now - start); // Calculate the difference in milliseconds
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
		return diffDays;
	  },

	  getDom: function() {
		const outerDiv = document.createElement("div");
		
		this.config.counters.forEach(element => {
			childElement = document.createElement("div");
			childElement.className = "counter";
			childElement.innerHTML = element.label.replace("{0}", this.getDaysSince(element.startDate));
			outerDiv.appendChild(childElement);
		});

		return outerDiv;
	  }
	
});
