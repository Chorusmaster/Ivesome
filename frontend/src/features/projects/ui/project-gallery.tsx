import Card from "@/shared/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { filePathToUrl } from "@/shared/lib/utils";

function ProjectGallery({ mediaLinks }: { mediaLinks: string[] }) {
  if (mediaLinks.length === 0) return null;

  return (
    <Card>
      <h2 className="heading">Galery</h2>
      <div className="px-8">
        <Carousel className="w-full">
          <CarouselContent>
            {mediaLinks.map((src, index) => (
              <CarouselItem key={`${src}-${index}`} className="basis-1/3">
                <img src={filePathToUrl(src)} alt="" className="h-56 w-full object-cover border border-border rounded-card" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Card>
  );
}

export default ProjectGallery;