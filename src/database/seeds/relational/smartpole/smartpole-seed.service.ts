import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PoleEntity } from 'src/pole/infrastructure/relational/entities/pole.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class SmartpoleSeedService {
  constructor(
    @InjectRepository(PoleEntity)
    private repository: Repository<PoleEntity>,
  ) {}
  async run() {
    const areas = ['HCMUT-CS1', 'HCMUT-CS2'];
    type PairLocation = {
      lat1: number;
      lng1: number;
      lat2: number;
      lng2: number;
    };
    const pairsLocation1: PairLocation[] = [
      {
        lat1: 10.772154517587094,
        lng1: 106.65799078417935,
        lat2: 10.773973404329478,
        lng2: 106.66141965196553,
      },
      {
        lat1: 10.772900034045186,
        lng1: 106.66057025910759,
        lat2: 10.774600991655372,
        lng2: 106.65958636895377,
      },
    ];
    const pairsLocation2: PairLocation[] = [
      {
        lat1: 10.879581718567092,
        lng1: 106.80506817435548,
        lat2: 10.881214517372676,
        lng2: 106.80612433797691,
      },
      {
        lat1: 10.879514898028798,
        lng1: 106.80526521255692,
        lat2: 10.88049780898303,
        lng2: 106.8059399048784,
      },
      {
        lat1: 10.880399641876274,
        lng1: 106.80741689225768,
        lat2: 10.882045506520996,
        lng2: 106.8048302579133,
      },
      {
        lat1: 10.879452600546452,
        lng1: 106.80519804362596,
        lat2: 10.88024275291121,
        lng2: 106.80393910293876,
      },
      {
        lat1: 10.879792385828841,
        lng1: 106.80702536364485,
        lat2: 10.881080660861091,
        lng2: 106.8050095484772,
      },
      {
        lat1: 10.880621599755438,
        lng1: 106.80473344646668,
        lat2: 10.880171722814598,
        lng2: 106.80541198754605,
      },
      {
        lat1: 10.880500334787325,
        lng1: 106.80748321093425,
        lat2: 10.882131160979615,
        lng2: 106.80488639755671,
      },
      {
        lat1: 10.881781905048289,
        lng1: 106.80607683920181,
        lat2: 10.88148992441128,
        lng2: 106.8060820666026,
      },
      {
        lat1: 10.880792495983851,
        lng1: 106.80419573461363,
        lat2: 10.880351574223042,
        lng2: 106.80393217927262,
      },
      {
        lat1: 10.880666344583583,
        lng1: 106.80577049653942,
        lat2: 10.881199424655708,
        lng2: 106.80611310911006,
      },
    ];
    const distancesBetweenPoles = 25;

    /**
     * Using Haversine formula to calculate the distance between two points
     */
    const calculateDistance = (pairLocation: PairLocation): number => {
      const R = 6371 * 1000; // Radius of the earth in m
      const dLat = deg2rad(pairLocation.lat2 - pairLocation.lat1); // deg2rad below
      const dLng = deg2rad(pairLocation.lng2 - pairLocation.lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(pairLocation.lat1)) *
          Math.cos(deg2rad(pairLocation.lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in m
      return Math.round(distance);
    };
    const deg2rad = (deg: number) => {
      return deg * (Math.PI / 180);
    };
    const amountOfPoles = (pairLocation: PairLocation): number => {
      return Math.floor(
        calculateDistance(pairLocation) / distancesBetweenPoles,
      );
    };

    for (const pairLocation of pairsLocation1) {
      const index = pairsLocation1.indexOf(pairLocation);
      const amount = amountOfPoles(pairLocation);
      for (let i = 0; i <= amount; i++) {
        const status =
          faker.number.int({ min: 0, max: 10 }) == 0 ? false : true;
        const lightLevel = status ? faker.number.int({ min: 0, max: 100 }) : 0;
        const smartpole = this.repository.create({
          name: `Smartpole ${i + 1}`,
          road: `Road ${index + 1}`,
          area: areas[0],
          latitude:
            ((amount - i) * pairLocation.lat1 + i * pairLocation.lat2) / amount,
          longitude:
            ((amount - i) * pairLocation.lng1 + i * pairLocation.lng2) / amount,
          status: status,
          lightLevel: lightLevel,
          burningTime: faker.number.int({
            min: 0,
            max: 100000,
          }),
          frequency: faker.number.int({ min: 0, max: 100 }),
        });
        await this.repository.save(smartpole);
      }
    }

    for (const pairLocation of pairsLocation2) {
      const amount = amountOfPoles(pairLocation);
      const index = pairsLocation2.indexOf(pairLocation);
      for (let i = 0; i <= amount; i++) {
        const smartpole = this.repository.create({
          name: `Smartpole ${i + 1}`,
          road: `Road ${index + 1}`,
          area: areas[1],
          latitude:
            ((amount - i) * pairLocation.lat1 + i * pairLocation.lat2) / amount,
          longitude:
            ((amount - i) * pairLocation.lng1 + i * pairLocation.lng2) / amount,
          status: faker.number.int({ min: 0, max: 10 }) == 0 ? false : true,
          lightLevel: faker.number.int({ min: 0, max: 100 }),
          burningTime: faker.number.int({
            min: 0,
            max: 100000,
          }),
          frequency: faker.number.int({ min: 0, max: 100 }),
        });
        await this.repository.save(smartpole);
      }
    }
  }
}
