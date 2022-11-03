module.exports = queries = {
  ge: {
    MRI: {
      gesys: `
        INSERT INTO ge_mri_gesys (
          equipment_id,
          time_stamp,
          num_1,
          num_2,
          month,
          day,
          host_time,
          year,
          num_3,
          num_4,
          type,
          data_1,
          num_5,
          data_2,
          server_name,
          exception_class,
          task_id,
          time_2,
          object,
          sr_group,
          en,
          date_time
        )
        SELECT * FROM UNNEST (
          $1::text[], $2::numeric[], $3::text[], $4::text[], $5::text[], $6::text[], $7::time[], $8::text[], $9::text[], $10::text[], $11::text[], $12::text[], $13::text[], $14::text[], $15::text[], $16::text[], $17::text[], $18::text[], $19::text[], $20::text[], $21::text[], $22::date[]
        )
        `,
    },
    CT: {
      gesys: `
      INSERT INTO ge_ct_gesys (
        equipment_id,
        epoch,
        record_number_concurrent,
        misc_param_1,
        month,
        day,
        host_time,
        year,
        message_number,
        misc_param_2,
        type,
        data_1,
        num_1,
        date_2,
        host,
        ermes_number,
        exception_class,
        severity,
        file,
        line_number,
        message,
        sr,
        en,
        date_time
      )
      SELECT * FROM UNNEST (
        $1::text[], $2::numeric[], $3::numeric[], $4::numeric[], $5::text[], $6::numeric[], $7::time[], $8::numeric[], $9::numeric[], $10::numeric[], $11::text[], $12::text[], $13::text[], $14::text[], $15::text[], $16::numeric[], $17::text[], $18::text[], $19::text[], $20::numeric[], $21::text[], $22::numeric[], $23::numeric[], $24::date[]
      )
      `,
    },
    CV: {
      sysError: `
      INSERT INTO ge_cv_syserror (
        equipment_id,
        sequencenumber,
        host_date,
        host_time,
        subsystem,
        errorcode,
        errortext,
        exam,
        exceptioncategory,
        application,
        majorfunction,
        minorfunction,
        fru,
        viewinglevel,
        rootcause,
        repeatcount,
        debugtext,
        sourcefile,
        sourceline,
        date_time
      )
      SELECT * FROM UNNEST (
        $1::text[], $2::numeric[], $3::date[], $4::text[], $5::text[], $6::numeric[], $7::text[], $8::numeric[], $9::text[], $10::text[], $11::text[], $12::text[], $13::text[], $14::numeric[], $15::numeric[], $16::numeric[], $17::text[], $18::text[], $19::numeric[], $20::date[]
      )
      `,
    },
  },
  siemens: {
    CT: {
      windows: `
      INSERT INTO siemens_ct (
          equipment_id,
          host_state,
          host_date,
          host_time,
          source_group,
          type_group,
          text_group,
          domain_group,
          id_group,
          month,
          day,
          year,
          date_time
      )
      SELECT * FROM UNNEST (
        $1::text[], $2::text[], $3::date[], $4::time[], $5::text[], $6::numeric[], $7::text[], $8::text[], $9::numeric[], $10::text[], $11::numeric[], $12::numeric[], $13::date[]
      )
      `,
    },
    MRI: {
      windows: `
      INSERT INTO siemens_mri (
          equipment_id,
          host_state,
          host_date,
          host_time,
          source_group,
          type_group,
          text_group,
          domain_group,
          id_group,
          month,
          day,
          year,
          date_time
      )
      SELECT * FROM UNNEST (
        $1::text[], $2::text[], $3::date[], $4::time[], $5::text[], $6::numeric[], $7::text[], $8::text[], $9::numeric[], $10::text[], $11::numeric[], $12::numeric[], $13::date[]
      )
      `,
    },
  },
  philips: {
    CT: {
      eal_info: `
      INSERT INTO philips_ct_eal (
        equipment_id,
        line,
        err_type,
        tmstamp,
        file,
        datatype,
        param1,
        errnum,
        info,
        dtime,
        ealtime,
        lognumber,
        param2,
        vxwerrno,
        controller,
        date_time
      )
      SELECT * FROM UNNEST (
        $1::text[], $2::text[], $3::text[], $4::text[], $5::text[], $6::text[], $7::text[], $8::text[], $9::text[], $10::text[], $11::text[], $12::text[], $13::text[], $14::numeric[], $15::text[], $16::date[]
      )
      `,
      events: `
      INSERT INTO philips_ct_events (
      equipment_id,
      eventtime,
      blob,
      type,
      tstampnum,
      eal,
      level,
      ermodulernum,
      dtime,
      msg,
      date_time
    )
    SELECT * FROM UNNEST (
      $1::text[], $2::text[], $3::text[], $4::text[], $5::text[], $6::text[], $7::text[], $8::text[], $9::text[], $10::text[], $11::date[]
    )
      `,
    },
    MR: {
      logcurrent: `
      INSERT INTO philips_mri_logcurrent (
        equipment_id,
        host_date,
        host_time,
        row_type,
        event_type,
        subsystem,
        code_1,
        code_2,
        group_1,
        message,
        packets_created,
        data_created_gb,
        size_copy_gb,
        data_8,
        reconstructor,
        date_time
    )
    SELECT * FROM UNNEST (
      $1::text[], $2::date[], $3::time[], $4::text[], $5::text[], $6::text[], $7::text[], $8::text[], $9::text[], $10::text[], $11::text[], $12::text[], $13::text[], $14::text[], $15::text[], $16::date[]
    )
      `,
      rmmu_short: `
    INSERT INTO philips_mri_rmmu_short(
      equipment_id,
      system_reference_number,
      hospital_name,
      serial_number_magnet,
      serial_number_meu,
      lineno,
      year,
      mo,
      dy,
      hr,
      mn,
      ss,
      hs,
      AvgPwr,
      MinPwr,
      MaxPwr,
      AvgAbs,
      AvgPrMbars,
      MinPrMbars,
      MaxPrMbars,
      LHePct,
      LHe2,
      DiffPressureSwitch,
      TempAlarm,
      PressureAlarm,
      Cerr,
      CompressorReset,
      Chd,
      Cpr,
      date_time
  )
  SELECT * FROM UNNEST (
    $1::text[], $2::text[], $3::text[], $4::text[], $5::text[], $6::numeric[], $7::numeric[], $8::numeric[], $9::numeric[], $10::numeric[], $11::numeric[], $12::numeric[], $13::numeric[], $14::numeric[], $15::numeric[], $16::numeric[], $17::numeric[], $18::numeric[], $19::numeric[], $20::numeric[], $21::numeric[], $22::numeric[], $23::text[], $24::text[], $25::text[], $26::text[], $27::text[], $28::numeric[], $29::numeric[], $30::date[]
  )
    `,
      rmmu_long: `
    INSERT INTO philips_mri_rmmu_long(
      equipment_id,
      system_reference_number,
      hospital_name,
      serial_number_magnet,
      serial_number_meu,
      lineno,
      year,
      mo,
      dy,
      hr,
      mn,
      ss,
      hs,
      dow,
      AvgPwr,
      MinPwr,
      MaxPwr,
      AvgAbs,
      AvgPrMbars,
      MinPrMbars,
      MaxPrMbars,
      LHePct,
      LHe2,
      DiffPressureSwitch,
      TempAlarm,
      PressureAlarm,
      Cerr,
      CompressorReset,
      Chd,
      Cpr,
      date_time
  )
  SELECT * FROM UNNEST (
    $1::text[], $2::text[], $3::text[], $4::text[], $5::text[], $6::numeric[], $7::numeric[], $8::numeric[], $9::numeric[], $10::numeric[], $11::numeric[], $12::numeric[], $13::numeric[], $14::numeric[], $15::numeric[], $16::numeric[], $17::numeric[], $18::numeric[], $19::numeric[], $20::numeric[], $21::numeric[], $22::numeric[], $23::numeric[], $24::text[], $25::text[], $26::text[], $27::text[], $28::text[], $29::numeric[], $30::numeric[], $31::date[]
  )
    `,
    },
  },
};
