package com.office.oficeSpace.controller;


import com.office.oficeSpace.entity.Booking;
import com.office.oficeSpace.services.BookingService;
import com.office.oficeSpace.services.BookingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "localhost:4200/**", allowedHeaders = "*")
public class BookingController {@Autowired
private BookingService bookingService;

    @PostMapping()
    public ResponseEntity<Booking > addApps(@RequestBody Appliances appliances){
        Appliances saveApp = this.appliancesService.addApp(appliances);
        return ResponseEntity.ok(saveApp);
    }

    @GetMapping
    public ResponseEntity<List<Appliances>> getAllApp(){
        List<Appliances> appList = this.appliancesService.getAllApp();
        return  ResponseEntity.ok(appList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appliances> getAppById(@PathVariable Long id){
        Optional<Appliances> app = this.appliancesService.getAppById(id);
        return app.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApp(@PathVariable Long id){
        this.appliancesService.deleteApp(id);
        return ResponseEntity.noContent().build();

    }

//The Functions

    @PostMapping("/totalPower")
    public int calcTotalPower(@RequestBody Appliances appliance) {
        return appliancesService.calcTotalPower(appliance);
    }

    @PostMapping("/totalEnergy")
    public int calcTotalEnergy(@RequestBody Appliances appliance) {
        return appliancesService.calcTotalEnergy(appliance);
    }

    @PostMapping("/sumTotalPower")
    public int calcSumTotalPower(@RequestBody List<Appliances> appliances) {
        return appliancesService.calcSumTotalPower(appliances);
    }

    @PostMapping("/sumTotalEnergy")
    public int calcSumTotalEnergy(@RequestBody List<Appliances> appliances) {
        return appliancesService.calcSumTotalEnergy(appliances);
    }
﻿

}
