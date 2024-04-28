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
        lat1: 10.772151681864232,
        lng1: 106.65798775908489,
        lat2: 10.773974113451079,
        lng2: 106.66141881637034,
      },
      {
        lat1: 10.77288868028852,
        lng1: 106.66053760433263,
        lat2: 10.774598045470702,
        lng2: 106.65958282423979,
      },
      {
        lat1: 10.774038415166572,
        lng1: 106.65986228316743,
        lat2: 10.773567305530507,
        lng2: 106.65884728581092,
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
      for (let i = 0; i < amount; i++) {
        const status = faker.datatype.boolean();
        const lightLevel = status ? faker.number.int({ min: 0, max: 100 }) : 0;
        const smartpole = this.repository.create({
          name: `Smartpole ${i + 1}`,
          road: `Road ${index + 1}`,
          area: areas[0],
          latitude:
            pairLocation.lat1 + (pairLocation.lat2 - pairLocation.lat1) * i,
          longitude:
            pairLocation.lng1 + (pairLocation.lng2 - pairLocation.lng1) * i,
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
      for (let i = 0; i < amount; i++) {
        const smartpole = this.repository.create({
          name: `Smartpole ${i + 1}`,
          road: `Road ${index + 1}`,
          area: areas[1],
          latitude:
            ((amount - i) * pairLocation.lat1 + i * pairLocation.lat2) / amount,
          longitude:
            ((amount - i) * pairLocation.lng1 + i * pairLocation.lng2) / amount,
          status: faker.datatype.boolean(),
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
